const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    category: {
      type: String,
    },
    openingTime: {
      type: String,
    },
    closingTime: {
      type: String,
    },
    priceRange: {
      type: String,
    },
    discount: {
      type: Number,
    },
    deliveryTime: {
      type: String,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
