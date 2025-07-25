const express = require("express");
const router = express.Router();
const FcmToken = require("../../models/FcmToken");
const sendPushNotification = require("../../utils/sendPushNotification");

// POST /api/fcm/save
// ✅ Route 1: Save Token
router.post("/save", async (req, res) => {
  const { token, userId, role } = req.body;

  if (!token || !userId) {
    return res.status(400).json({ message: "Missing token or userId" });
  }

  try {
    let existing = await FcmToken.findOne({ userId });

    // if (existing) {
    //   existing.token = token;
    //   existing.role = role;
    //   await existing.save();
    // } else {
    //   await FcmToken.create({ token, userId, role });
    // }

      if (!existing) {
      // Save new token
      await FcmToken.create({ token, userId, role });
      // console.log(`New FCM token saved for user ${userId}`);
    } else {
      // console.log(`FCM token already exists for user ${userId}`);
    }

    res.status(200).json({ message: "Token saved" });
  } catch (error) {
    console.error("Save token error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Route 2: Send Notification
router.post("/send", async (req, res) => {
  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res.status(400).json({ message: "Missing token, title, or body" });
  }

  try {
    const response = await sendPushNotification(token, title, body);
    if (response) {
      res.json({ success: true, messageId: response });
    } else {
      res.status(500).json({ success: false, message: "Failed to send" });
    }
  } catch (error) {
    console.error("Push send error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Route 3: Broadcast to all users or admins
router.post("/broadcast", async (req, res) => {
  const { title, body, role } = req.body;

  if (!title || !body || !role) {
    return res.status(400).json({ message: "Missing title, body, or role" });
  }

  try {
    const tokens = await FcmToken.find({ role }).select("token -_id");
    const tokenList = tokens.map((doc) => doc.token);

    const promises = tokenList.map((token) =>
      sendPushNotification(token, title, body)
    );

    const results = await Promise.allSettled(promises);

    const successCount = results.filter((r) => r.status === "fulfilled").length;
    const failedCount = results.filter((r) => r.status === "rejected").length;

    res.json({
      success: true,
      sent: successCount,
      failed: failedCount,
    });
  } catch (error) {
    console.error("Broadcast error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
