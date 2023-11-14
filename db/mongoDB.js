const mongoose = require("mongoose");
require("dotenv/config");

const mongoDBURL = process.env.DBURL;

const connect = async () => {
  try {
    await mongoose.connect(mongoDBURL, {
      // useNewUrlParser:true,
      // useUnifiedTopology: true,
    });
    console.log('mongoDB connected successfully');
  } catch (error) {
    console.log("mongoDB connected successfully");
  }
};

module.exports = connect;
