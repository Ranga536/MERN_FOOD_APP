const { imageUploadUtil } = require("../../helpers/cloudinary");
const Menu = require("../../models/Menu");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64"); //convert buffer to base64 string why because cloudinary accepts base64 string and base64 string is smaller than buffer

    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      message: "image uploaded successfully",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Image upload failed",
    });
  }
};

//add a new menu item
const addMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      name,
      description,
      originalPrice,
      offerPrice,
      isVeg,
      category,
      ingredients,
      preparationTime,
      rating,
      isAvailable,
    } = req.body;

    const newlyCreatedMenuItem = new Menu({
      restaurantId: id,
      image,
      name,
      description,
      originalPrice,
      offerPrice,
      isVeg,
      category,
      ingredients,
      preparationTime,
      rating,
      isAvailable,
    });

    await newlyCreatedMenuItem.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedMenuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

//fetch all menu items
const fetchAllMenuItems = async (req, res) => {
  try {
    const { id } = req.params;
    const listOfMenuItems = await Menu.find({ restaurantId: id });
    res.status(200).json({
      success: true,
      data: listOfMenuItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

//edit a menu item
const editMenuItem = async (req, res) => {
  try {
    const { id, menuId } = req.params;

    const {
      image,
      name,
      description,
      originalPrice,
      offerPrice,
      isVeg,
      category,
      ingredients,
      preparationTime,
      rating,
      isAvailable,
    } = req.body;

    const findMenuItem = await Menu.findById(menuId); //find the restaurant by its id

    if (!findMenuItem)
      return res.status(404).json({
        success: false,
        message: "Menu Item not found",
      });

    findMenuItem.name = name || findMenuItem.name; //update the menu Item name if it is provided in the body or keep the old name
    findMenuItem.description = description || findMenuItem.description;
    findMenuItem.originalPrice = originalPrice || findMenuItem.originalPrice;
    findMenuItem.offerPrice = offerPrice || findMenuItem.offerPrice;
    findMenuItem.isVeg = isVeg || findMenuItem.isVeg;
    findMenuItem.category = category || findMenuItem.category;
    findMenuItem.ingredients = ingredients || findMenuItem.ingredients;
    findMenuItem.preparationTime =
      preparationTime || findMenuItem.preparationTime;
    findMenuItem.rating = rating || findMenuItem.rating;
    findMenuItem.isAvailable = isAvailable || findMenuItem.isAvailable;
    findMenuItem.image = image || findMenuItem.image;

    await findMenuItem.save(); //save the updated Menu Item to the database

    res.status(200).json({
      success: true,
      message: "Menu Item updated successfully",
      data: findMenuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

//delete a menu item
const deleteMenuItem = async (req, res) => {
  try {
    const { id, menuId } = req.params;

    const menuItem = await Menu.findByIdAndDelete(menuId);

    if (!menuItem)
      return res.status(404).json({
        success: false,
        message: "Menu Item not found",
      });

    res.status(200).json({
      success: true,
      message: "Menu Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  handleImageUpload,
  addMenuItem,
  fetchAllMenuItems,
  editMenuItem,
  deleteMenuItem,
};
