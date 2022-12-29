const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI);

  const connection = mongoose.connection;

  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });

  connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit();
  });
};

module.exports =  connectDB;