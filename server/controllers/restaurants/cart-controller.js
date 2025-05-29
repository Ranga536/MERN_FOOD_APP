const Cart = require("../../models/Cart");
const Restaurant = require("../../models/Restaurant");
const Menu = require("../../models/Menu");
const User = require("../../models/User");

const addToCart = async (req, res) => {
  try {
    const { userId, menuItemId, quantity } = req.body;

    if (!userId || !menuItemId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const menuItem = await Menu.findById(menuItemId).populate("restaurantId");

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found!",
      });
    }

    const restaurantId = menuItem.restaurantId._id;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if same restaurant
      if (cart.restaurantId.toString() !== restaurantId.toString()) {
        return res.status(400).json({
          success: false,
          message: "You can only order from one restaurant at a time.",
        });
      }

      // Check if item already exists
      const itemIndex = cart.items.findIndex(
        (item) => item.menuItemId.toString() === menuItemId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ menuItemId, quantity });
      }

      await cart.save();
      return res.status(200).json({
        success: true,
        message: "Item added to cart successfully!",
        data: cart,
      });
    } else {
      // create new cart
      const newCart = new Cart({
        userId,
        restaurantId,
        items: [{ menuItemId, quantity }],
        deliveryCharge: 40,
      });

      await newCart.save();
      return res.status(201).json({
        success: true,
        message: "Cart created and item added successfully!",
        data: newCart,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is mandatory!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.menuItemId",
      select: "image name originalPrice offerPrice restaurantId",
      populate: {
        path: "restaurantId",
        select: "name",
      },
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Filter out invalid or deleted menu items
    const validItems = cart.items.filter((item) => item.menuItemId);

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    // Map the cleaned and populated items properly
    const populatedCartItems = validItems.map((item) => ({
      menuItemId: item.menuItemId._id,
      restaurantId: item.menuItemId.restaurantId?._id,
      restaurantName: item.menuItemId.restaurantId?.name,
      image: item.menuItemId.image,
      name: item.menuItemId.name,
      originalPrice: item.menuItemId.originalPrice,
      offerPrice: item.menuItemId.offerPrice,
      quantity: item.quantity,
    }));

    // res.status(200).json({
    //   success: true,
    //   data: {
    //     _id: cart._id,
    //     userId: cart.userId,
    //     restaurantId: cart.restaurantId,
    //     deliveryCharge: cart.deliveryCharge,
    //     items: populatedCartItems,
    //   },
    // });

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populatedCartItems,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateCartItems = async (req, res) => {
  try {
    const { userId, menuItemId, quantity } = req.body;

    if (!userId || !menuItemId || quantity === undefined || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Find user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Find the item in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.menuItemId.toString() === menuItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart!",
      });
    }

    // Update quantity or remove if quantity invalid (you already validated above but still safe to check)
    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    // Populate updated items for response
    await cart.populate({
      path: "items.menuItemId",
      // select: "image name originalPrice offerPrice restaurantId restaurantName",
        populate: {
    path: "restaurantId",
    model: "Restaurant",
    select: "name", // assuming 'name' is the restaurant name field
  },
    });

    const updatedItems = cart.items.map((item) => ({
      menuItemId: item.menuItemId?._id,
      restaurantId: item.menuItemId?.restaurantId,
      restaurantName: item.menuItemId?.restaurantId?.name,
      image: item.menuItemId?.image,
      name: item.menuItemId?.name || "Product not found",
      originalPrice: item.menuItemId?.originalPrice,
      offerPrice: item.menuItemId?.offerPrice,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: updatedItems,
      data: {
        ...cart._doc,
        items: updatedItems,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    const { userId, menuItemId } = req.params;

    if (!userId || !menuItemId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Safer filtering
    cart.items = cart.items.filter(
      (item) => item.menuItemId && item.menuItemId.toString() !== menuItemId
    );

    if (cart.items.length === 0) {
      await Cart.deleteOne({ _id: cart._id });
      return res.status(200).json({
        success: true,
        message: "Cart emptied and deleted successfully",
      });
    }

    await cart.save();

    // Populate only after saving
    await cart.populate({
      path: "items.menuItemId",
      // select: "image name originalPrice offerPrice restaurantId",
       populate: {
    path: "restaurantId",
    model: "Restaurant",
    select: "name", // assuming 'name' is the restaurant name field
  },
    });

    const populatedItems = cart.items.map((item) => ({
      menuItemId: item.menuItemId?._id,
      restaurantId: item.menuItemId?.restaurantId,
      restaurantName: item.menuItemId?.restaurantId?.name,
      image: item.menuItemId?.image,
      name: item.menuItemId?.name || "Product not found",
      originalPrice: item.menuItemId?.originalPrice,
      offerPrice: item.menuItemId?.offerPrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
      data: {
        ...cart._doc,
        items: populatedItems,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting cart item",
    });
  }
};

module.exports = {
  addToCart,
  fetchCartItems,
  updateCartItems,
  deleteCartItems,
};
