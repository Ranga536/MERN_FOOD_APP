const Menu = require("../../models/Menu");

// const getFilteredMenuItems = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(id)

//     const menuItems = await Menu.find({restaurantId: id});

//     res.status(200).json({
//       success: true,
//       data: menuItems,
//     });
//   } catch (error) {
//
//     res.status(500).json({
//       success: false,
//       message: "something went wrong!",
//     });
//   }
// };

const getFilteredMenuItems = async (req, res) => {
  try {
    const { id } = req.params;

    const { isVeg = [], category = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (isVeg.length) {
      filters.isVeg = { $in: isVeg.split(",") };
    }

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.offerPrice = 1;
        break;
      case "price-hightolow":
        sort.offerPrice = -1;
        break;

      default:
        sort.offerPrice = 1;
        break;
    }

    const menuItems = await Menu.find({ restaurantId: id, ...filters }).sort(
      sort
    );

    res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong!",
    });
  }
};

module.exports = { getFilteredMenuItems };
