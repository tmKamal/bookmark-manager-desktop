const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://tmkamal:Pass4mongodb@bookmark-app.ryvnh.mongodb.net/bookmarker?retryWrites=true&w=majority",
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
    );
    console.log('connection to the mongoDB has been made!')
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

//connect to DB

module.exports = connectDB;
