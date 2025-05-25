const { imageUploadUtil } = require("../../helpers/cloudinary");
const Restaurant = require("../../models/Restaurant");

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

//add a new restaurant to the database

const addRestaurant = async (req, res) => {
  try {
    const {
      image,
      name,
      description,
      email,
      phone,
      address,
      category,
      openingTime,
      closingTime,
      priceRange,
      discount,
      deliveryTime,
      rating,
    } = req.body; //destructure the body of the restaurant

    const newlyCreatedRestaurant = await Restaurant.create({
      image,
      name,
      description,
      email,
      phone,
      address,
      category,
      openingTime,
      closingTime,
      priceRange,
      discount,
      deliveryTime,
      rating,
    });

    await newlyCreatedRestaurant.save(); //save the newly created restaurant to the database

    res.status(201).json({
      success: true,
      message: "Restaurant added successfully",
      data: newlyCreatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to add restaurant",
    });
  }
};

//fetch all restaurants from the database
const fetchAllRestaurants = async (req, res) => {
  try {
    const listOfRestaurants = await Restaurant.find({}); //find all the restaurants in the database

    res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully",
      data: listOfRestaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to add restaurant",
    });
  }
};

//edit a restaurant in thr database
const editRestaurant = async (req, res) => {
  try {
    const { id } = req.params; //destructure the params of the restaurant

    const {
      image,
      name,
      description,
      email,
      phone,
      address,
      category,
      openingTime,
      closingTime,
      priceRange,
      discount,
      deliveryTime,
      rating,
    } = req.body; //destructure the body of the restaurant

    const findRestaurant = await Restaurant.findById(id); //find the restaurant by its id

    if (!findRestaurant)
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });

    findRestaurant.name = name || findRestaurant.name; //update the restaurant name if it is provided in the body or keep the old name
    findRestaurant.description = description || findRestaurant.description;
    findRestaurant.email = email || findRestaurant.email;
    findRestaurant.phone = phone || findRestaurant.phone;
    findRestaurant.address = address || findRestaurant.address;
    findRestaurant.category = category || findRestaurant.category;
    findRestaurant.openingTime = openingTime || findRestaurant.openingTime;
    findRestaurant.closingTime = closingTime || findRestaurant.closingTime;
    findRestaurant.priceRange = priceRange || findRestaurant.priceRange;
    findRestaurant.discount = discount || findRestaurant.discount;
    findRestaurant.rating = rating || findRestaurant.rating;
    findRestaurant.deliveryTime = deliveryTime || findRestaurant.deliveryTime;
    findRestaurant.image = image || findRestaurant.image;

    await findRestaurant.save(); //save the updated restaurant to the database

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      data: findRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to add restaurant",
    });
  }
};

//delete a restaurant from the database
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant)
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to add restaurant",
    });
  }
};

module.exports = {
  handleImageUpload,
  addRestaurant,
  fetchAllRestaurants,
  editRestaurant,
  deleteRestaurant,
};
