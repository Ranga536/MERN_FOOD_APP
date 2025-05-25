const express = require("express");

const {
  getFilteredRestaurants,
} = require("../../controllers/restaurants/restaurants-controller");

const router = express.Router();

router.get("/get", getFilteredRestaurants);

module.exports = router;
