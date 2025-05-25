const mongoose = require("mongoose");

// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }  //use if any error in versions and parser, topology

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongodb connected successfully!");
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDB;
