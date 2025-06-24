const Order = require("../../models/Order");

// const getAllOrdersOfAllUsers = async (req, res) => {
//   try {
//     const orders = await Order.find();

//     if (!orders.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No orders found!",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Orders fetched successfully",
//       data: orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred",
//     });
//   }
// };

const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    startOfToday.setHours(startOfToday.getHours() + 5.5); // convert to IST

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    endOfToday.setHours(endOfToday.getHours() + 5.5); // convert to IST

    const todayOrders = await Order.find({
      orderDate: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });

    if (!todayOrders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for today!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Today's orders fetched successfully",
      data: todayOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};



const getOrderDetailsForAdmin = async (req, res) => {
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

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not found!",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
