const express = require("express");

const {
  getFilteredMenuItems,
} = require("../../controllers/restaurants/menu-controller");

const router = express.Router({ mergeParams: true });

router.get("/get", getFilteredMenuItems);

module.exports = router;
