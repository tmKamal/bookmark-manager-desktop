const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://<username>:<password>@<somthing>.mongodb.net/<dbname>?retryWrites=true&w=majority",
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
    );
    console.log('connection to the mongoDB has been made!')
  } catch (err) {
    console.log(err);
    console.log("please set your mongodb atlas db first!!, in config -> db.js")
    process.exit(1);
  }
};

//connect to DB

module.exports = connectDB;
