const express = require("express");

const {
  addToCart,
  fetchCartItems,
  updateCartItems,
  deleteCartItems,
} = require("../../controllers/restaurants/cart-controller");

const router = express.Router({ mergeParams: true });

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItems);
router.delete("/:userId/:menuItemId", deleteCartItems);

module.exports = router;
