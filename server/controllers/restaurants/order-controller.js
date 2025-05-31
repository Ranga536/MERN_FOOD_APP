const nodemailer = require("nodemailer");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const User = require("../../models/User");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
    } = req.body;

    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
    });

    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: newlyCreatedOrder._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// const deleteCartAfterOrderSuccess = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     let order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // Fetch user details manually
//     const user = await User.findById(order.userId); // Assuming userId is stored as a string

//     order.orderStatus = "confirmed";

//     const getCartId = order.cartId;

//     await Cart.findByIdAndDelete(getCartId);

//     await order.save();

//     // Create transporter for sending email
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.ADMIN_EMAIL,
//         pass: process.env.ADMIN_EMAIL_PASS,
//       },
//     });

//     // Create email content
//     const mailOptions = {
//       from: `"Food Delivery App" <${process.env.ADMIN_EMAIL}>`,
//       to: process.env.ADMIN_EMAIL,
//       subject: `New Order Received - ID: ${order._id}`,
//       html: `
//     <div style="background: linear-gradient(135deg, #f0f4ff, #e0f7fa); padding: 20px; font-family: Arial, sans-serif; color: #333; border-radius: 10px;">
//       <h2 style="color: #2e86de;">🛒 New Order Received</h2>

//       <div style="margin-bottom: 15px; padding: 15px; background: #ffffff; border-left: 5px solid #2e86de; border-radius: 5px;">
//         <p><strong>Order ID:</strong> ${order._id}</p>
//         <p><strong>User Name:</strong> ${user.userName}</p>
//         <p><strong>User ID:</strong> ${order.userId}</p>
//         <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
//         <p><strong>Status:</strong> ${order.orderStatus}</p>
//       </div>

//       <div style="margin-bottom: 15px; padding: 15px; background: #ffffff; border-left: 5px solid #26a69a; border-radius: 5px;">
//         <h3 style="color: #009688;">📍 Delivery Address:</h3>
//         <p>
//           ${order.addressInfo?.address},<br/>
//           ${order.addressInfo?.city} - ${order.addressInfo?.pincode}<br/>
//           Phone: ${order.addressInfo?.phone}<br/>
//           Notes: ${order.addressInfo?.notes || "N/A"}
//         </p>
//       </div>

//       <div style="margin-bottom: 15px; padding: 15px; background: #ffffff; border-left: 5px solid #9c27b0; border-radius: 5px;">
//         <h3 style="color: #9c27b0;">🍽️ Ordered Items:</h3>
//         <ul style="padding-left: 18px;">
//           ${order.cartItems
//             .map(
//               (item) => `
//               <li style="margin-bottom: 10px;">
//                 <strong>${item.name}</strong><br/>
//                 Quantity: ${item.quantity}<br/>
//                 Price: ₹${item.offerPrice}<br/>
//                 Restaurant: ${item.restaurantName}
//               </li>`
//             )
//             .join("")}
//         </ul>
//       </div>

//       <p style="color: #555; font-size: 14px;">🕒 Order Date: ${new Date(
//         order.orderDate
//       ).toLocaleString()}</p>
//     </div>
//       `,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);

//     res.status(200).json({
//       success: true,
//       //   message: "Order status updated and cart deleted successfully",
//       message: "Order Placed successfully! 🎉📦",
//       data: order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred",
//     });
//   }
// };

const deleteCartAfterOrderSuccess = async (req, res) => {
  try {
    const { orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Fetch user details manually
    const user = await User.findById(order.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    order.orderStatus = "confirmed";

    const getCartId = order.cartId;

    await Cart.findByIdAndDelete(getCartId);
    await order.save();

    // Create transporter for sending email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    // Generate HTML content for the email
    const emailHtmlContent = `
      <div style="background: linear-gradient(135deg, #f0f4ff, #e0f7fa); padding: 20px; font-family: Arial, sans-serif; color: #333; border-radius: 10px;">
        <h2 style="color: #2e86de;">🛒 Order Confirmation</h2>

        <div style="margin-bottom: 15px; padding: 15px; background: #ffffff; border-left: 5px solid #2e86de; border-radius: 5px;">
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>User Name:</strong> ${user.userName}</p>
          <p><strong>User ID:</strong> ${order.userId}</p>
          <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
          <p><strong>Status:</strong> ${order.orderStatus}</p>
        </div>

        <div style="margin-bottom: 15px; padding: 15px; background: #ffffff; border-left: 5px solid #26a69a; border-radius: 5px;">
          <h3 style="color: #009688;">📍 Delivery Address:</h3>
          <p>
            ${order.addressInfo?.address},<br/>
            ${order.addressInfo?.city} - ${order.addressInfo?.pincode}<br/>
            Phone: ${order.addressInfo?.phone}<br/>
            Notes: ${order.addressInfo?.notes || "N/A"}
          </p>
        </div>

        <div style="margin-bottom: 15px; padding: 15px; background: #ffffff; border-left: 5px solid #9c27b0; border-radius: 5px;">
          <h3 style="color: #9c27b0;">🍽️ Ordered Items:</h3>
          <ul style="padding-left: 18px;">
            ${order.cartItems
              .map(
                (item) => `
                <li style="margin-bottom: 10px;">
                  <strong>${item.name}</strong><br/>
                  Quantity: ${item.quantity}<br/>
                  Price: ₹${item.offerPrice}<br/>
                  Restaurant: ${item.restaurantName}
                </li>`
              )
              .join("")}
          </ul>
        </div>
        
        <p style="color: #555; font-size: 14px;">🕒 Order Date: ${new Date(
          order.orderDate
        ).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
      </div>
    `;

    // Admin email
    const adminMailOptions = {
      from: `"Delbite Team" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Order Received - ID: ${order._id}`,
      html: emailHtmlContent,
    };

    // User email
    const userMailOptions = {
      from: `"Delbite Team" <${process.env.ADMIN_EMAIL}>`,
      to: user.email,
      subject: `Your Order Confirmation - ID: ${order._id}`,
      html: emailHtmlContent,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({
      success: true,
      message: "Order placed successfully! 🎉📦 Email sent to admin and user.",
      data: order,
    });
  } catch (error) {
    console.error("Order confirmation error:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while confirming the order.",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = {
  createOrder,
  deleteCartAfterOrderSuccess,
  getAllOrdersByUser,
  getOrderDetails,
};
