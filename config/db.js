const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: "customerDB",
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;