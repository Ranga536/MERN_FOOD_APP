require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const axios = require("axios");
const authRoutes = require("./routes/auth/auth-routes");
const adminRestaurantRoutes = require("./routes/admin/restaurants-routes");
const adminMenuItemsRoutes = require("./routes/admin/menu-routes");
const adminOrderRoutes = require("./routes/admin/order-routes");
const shopRestaurantsRoutes = require("./routes/restaurants/restaurants-routes");
const shopMenuItemsRoutes = require("./routes/restaurants/menu-routes");
const shopCartRoutes = require("./routes/restaurants/cart-routes");
const shopAddressRouter = require("./routes/restaurants/address-routes");
const shopOrderRoutes = require("./routes/restaurants/order-routes");
const shopSearchRoutes = require("./routes/restaurants/search-routes");
const commonFeatureRoutes = require("./routes/common/feature-routes");
const fcmRoutes = require("./routes/common/fcm-routes");
const adminNotificationRoutes = require("./routes/admin/adminNotificationRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

const url = `https://api.delbite.com/`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      // console.log("website reloded");
    })
    .catch((error) => {
      // console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);

app.get("/", (req, res) => {
  res.send("hello Foodie, Welcome To Delbite");
});

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin/restaurants", adminRestaurantRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/shop/restaurants", shopRestaurantsRoutes);
app.use("/api/shop/restaurants/:id", shopMenuItemsRoutes);
app.use("/api/admin/restaurants/:id", adminMenuItemsRoutes);
app.use("/api/shop/cart", shopCartRoutes);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRoutes);
app.use("/api/shop/search", shopSearchRoutes);
app.use("/api/common/feature", commonFeatureRoutes);
app.use("/api/fcm", fcmRoutes);
app.use("/api/admin", adminNotificationRoutes);

app.listen(PORT, () => {
  console.log("server running!!")
});
