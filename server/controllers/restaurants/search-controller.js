const Menu = require("../../models/Menu");

const searchFoodItems = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in string format",
      });
    }

    const regEx = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [{ name: regEx }, { description: regEx }, { category: regEx }],
    };

    const foodItems = await Menu.find(createSearchQuery);

    res.status(200).json({
      success: true,
      message: "Food items fetched successfully",
      data: foodItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = { searchFoodItems };
