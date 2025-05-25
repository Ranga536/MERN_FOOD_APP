const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    //pricing
    originalPrice: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    //Food Info
    isVeg: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
    },
    //other details
    preparationTime: String, //in minutes
    rating: {
      type: String,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//Discount calculation
MenuSchema.pre("save", function (next) {
  if (this.originalPrice > 0 && this.offerPrice < this.originalPrice) {
    const profit = this.originalPrice - this.offerPrice;
    this.discount = Math.round((profit / this.originalPrice) * 100);
  } else {
    this.discount = 0;
  }
  next();
});

module.exports = mongoose.model("Menu", MenuSchema);
