const Restaurant = require("../../models/Restaurant");

const getFilteredRestaurants = async (req, res) => {
  try {
    const { category = [], type = [], sortBy = "price-lowtohigh" } = req.query;

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

    const restaurants = await Restaurant.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong!",
    });
  }
};

module.exports = { getFilteredRestaurants };
