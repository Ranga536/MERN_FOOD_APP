const express = require("express");

const {
  searchFoodItems,
} = require("../../controllers/restaurants/search-controller");

const router = express.Router({ mergeParams: true });

router.get("/:keyword", searchFoodItems);

module.exports = router;
