const express = require("express");

const {
  handleImageUpload,
  addMenuItem,
  fetchAllMenuItems,
  editMenuItem,
  deleteMenuItem,
} = require("../../controllers/admin/menu-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router({ mergeParams: true });

router.post("/upload-image", upload.single("my_image"), handleImageUpload);
router.post("/add", addMenuItem);
router.put("/edit/:menuId", editMenuItem);
router.delete("/delete/:menuId", deleteMenuItem);
router.get("/get", fetchAllMenuItems);

module.exports = router;
