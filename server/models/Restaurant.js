const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    description: String,
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    address: String,
    category: String,
    openingTime: String,
    closingTime: String,
    priceRange: String,
    discount: Number,
    deliveryTime: String,
    isOpen: { type: Boolean, default: true },
    rating: String,

    // ✅ Add this
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], 
        default: [77.63676, 15.1143] // [longitude, latitude]
      },
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Add 2dsphere index
RestaurantSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Restaurant", RestaurantSchema);



// const mongoose = require("mongoose");

// const RestaurantSchema = new mongoose.Schema(
//   {
//     image: {
//       type: String,
//     },
//     name: {
//       type: String,
//     },
//     description: {
//       type: String,
//     },
//     email: {
//       type: String,
//       required: true,
//       lowercase: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//     },
//     address: {
//       type: String,
//     },
//     category: {
//       type: String,
//     },
//     openingTime: {
//       type: String,
//     },
//     closingTime: {
//       type: String,
//     },
//     priceRange: {
//       type: String,
//     },
//     discount: {
//       type: Number,
//     },
//     deliveryTime: {
//       type: String,
//     },
//     isOpen: {
//       type: Boolean,
//       default: true,
//     },
//     rating: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Restaurant", RestaurantSchema);
