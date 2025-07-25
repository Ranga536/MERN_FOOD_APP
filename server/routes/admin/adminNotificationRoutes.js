const express = require("express");
const router = express.Router();
const FcmToken = require("../../models/FcmToken");
const sendPushNotification = require("../../utils/sendPushNotification");

// POST /api/admin/notify
router.post("/notify", async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ message: "Missing title or body" });
  }

  try {
    // Find all user tokens (role === "user")
    const tokensDocs = await FcmToken.find({ role: "user" });
    const tokens = tokensDocs.map(doc => doc.token);

    if (tokens.length === 0) {
      return res.status(404).json({ message: "No users found with tokens." });
    }

    // Send notification to each token
    const results = await Promise.all(
      tokens.map(token => sendPushNotification(token, title, body))
    );

    res.json({ message: `Notifications sent to ${results.length} users.` });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
