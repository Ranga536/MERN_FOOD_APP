const express = require("express");

const {
  addRestaurant,
  editRestaurant,
  fetchAllRestaurants,
  deleteRestaurant,
} = require("../../controllers/admin/restaurants-controller");

const {
  handleImageUpload,
} = require("../../controllers/admin/restaurants-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addRestaurant);
router.get("/get", fetchAllRestaurants);
router.put("/edit/:id", editRestaurant);
router.delete("/delete/:id", deleteRestaurant);

module.exports = router;
