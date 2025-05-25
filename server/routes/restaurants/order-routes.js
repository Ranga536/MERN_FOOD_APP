const express = require("express");

const {
  createOrder,
  deleteCartAfterOrderSuccess,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/restaurants/order-controller");

const router = express.Router({ mergeParams: true });

router.post("/create", createOrder);
router.post("/success", deleteCartAfterOrderSuccess);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

module.exports = router;
