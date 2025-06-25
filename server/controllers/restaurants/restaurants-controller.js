const Restaurant = require("../../models/Restaurant");

const getFilteredRestaurants = async (req, res) => {
  try {
    const { category = [], type = [], sortBy = "price-lowtohigh", latitude, longitude } = req.query;

    console.log("Query Parameters:", req.query);
    // Validate latitude and longitude
    if (!latitude || !longitude || isNaN(Number(latitude)) || isNaN(Number(longitude))) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid latitude and longitude to get nearby restaurants.",
      });
    }

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (type.length) {
      filters.type = { $in: type.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.priceRange = 1;
        break;
      case "price-hightolow":
        sort.priceRange = -1;
        break;
      default:
        sort.priceRange = 1;
        break;
    }

    // MongoDB geo query for nearby restaurants within 10km radius (adjust distance as needed)
    const maxDistanceMeters = 50000; // 10km

    const restaurants = await Restaurant.find({
      ...filters,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: maxDistanceMeters,
        },
      },
    }).sort(sort);
    console.log(restaurants)

    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    console.error("Error in getFilteredRestaurants:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = { getFilteredRestaurants };




// const Restaurant = require("../../models/Restaurant");

// const getFilteredRestaurants = async (req, res) => {
//   try {
//     const { category = [], type = [], sortBy = "price-lowtohigh" } = req.query;

//     let filters = {};

//     if (category.length) {
//       filters.category = { $in: category.split(",") };
//     }

//     if (type.length) {
//       filters.type = { $in: type.split(",") };
//     }

//     let sort = {};

//     switch (sortBy) {
//       case "price-lowtohigh":
//         sort.priceRange = 1;
//         break;
//       case "price-hightolow":
//         sort.priceRange = -1;
//         break;

//       default:
//         sort.priceRange = 1;
//         break;
//     }

//     const restaurants = await Restaurant.find(filters).sort(sort);

//     res.status(200).json({
//       success: true,
//       data: restaurants,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "something went wrong!",
//     });
//   }
// };

// module.exports = { getFilteredRestaurants };
