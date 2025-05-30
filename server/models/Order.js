const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      menuItemId: String,
      name: String,
      image: String,
      restaurantId: String,
      restaurantName: String,
      offerPrice: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  //   paymentMethod: String,
  //   paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  // paymentId : String,
  // payerId : String
});

module.exports = mongoose.model("Order", OrderSchema);
