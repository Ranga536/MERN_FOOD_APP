const mongoose = require("mongoose");
const dotenv = require("dotenv");
const sendPushNotification = require("../utils/sendPushNotification");
const FcmToken = require("../models/FcmToken");

dotenv.config();

const messages = [
  {
    time: "morning",
    title: "☀️ Good Morning!",
    body: "Order hot and tasty tiffins from Gooty Eats now!",
  },
  {
    time: "afternoon",
    title: "🍛 Lunch Time!",
    body: "Fresh meals waiting for you. Order your lunch!",
  },
  {
    time: "evening",
    title: "🍽️ Dinner Deals!",
    body: "End your day with a delicious dinner. Order now!",
  },
];

const runScheduledPush = async (mealTime = "morning") => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const message = messages.find((msg) => msg.time === mealTime);
    if (!message) {
      console.log("Invalid mealTime passed");
      return;
    }

    const allTokens = await FcmToken.find({ role: "user" }).select("token -_id");
    const tokenList = allTokens.map((doc) => doc.token);

    const promises = tokenList.map((token) =>
      sendPushNotification(token, message.title, message.body)
    );

    const results = await Promise.allSettled(promises);
    console.log(
      `${mealTime.toUpperCase()}: Sent to ${results.filter((r) => r.status === "fulfilled").length} users`
    );

    process.exit(0);
  } catch (error) {
    console.error("Push Error:", error);
    process.exit(1);
  }
};

// Pass meal time as argument
const meal = process.argv[2] || "morning";
runScheduledPush(meal);
