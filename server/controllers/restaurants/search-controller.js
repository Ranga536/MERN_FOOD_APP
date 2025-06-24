const Menu = require("../../models/Menu");
const Restaurant = require("../../models/Restaurant");

const searchFoodItems = async (req, res) => {
  try {
    const { keyword } = req.params;
    const { latitude, longitude } = req.query;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in string format",
      });
    }

    if (!latitude || !longitude || isNaN(Number(latitude)) || isNaN(Number(longitude))) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required and must be valid numbers.",
      });
    }

    const maxDistanceMeters = 10000; // 10 km

    // Step 1: Get nearby restaurant IDs
    const nearbyRestaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: maxDistanceMeters,
        },
      },
    });

    const restaurantIds = nearbyRestaurants.map(r => r._id);

    if (restaurantIds.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No restaurants nearby.",
        data: [],
      });
    }

    const regEx = new RegExp(keyword, "i");

    // Step 2: Get menu items from nearby restaurants
    const foodItems = await Menu.find({
      restaurantId: { $in: restaurantIds },
      $or: [
        { name: regEx },
        { description: regEx },
        { category: regEx },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Menu items fetched successfully",
      data: foodItems,
    });

  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { searchFoodItems };




// const Menu = require("../../models/Menu");

// const searchFoodItems = async (req, res) => {
//   try {
//     const { keyword } = req.params;

//     if (!keyword || typeof keyword !== "string") {
//       return res.status(400).json({
//         success: false,
//         message: "Keyword is required and must be in string format",
//       });
//     }

//     const regEx = new RegExp(keyword, "i");

//     const createSearchQuery = {
//       $or: [{ name: regEx }, { description: regEx }, { category: regEx }],
//     };

//     const foodItems = await Menu.find(createSearchQuery);

//     res.status(200).json({
//       success: true,
//       message: "Food items fetched successfully",
//       data: foodItems,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong!",
//     });
//   }
// };

// module.exports = { searchFoodItems };
