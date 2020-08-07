const mongoose = require("mongoose");

const BookMarkSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true },
  category: { type: String, default:'other', enum:['important','daily','other']},
  url: { type: String, required: [true, "URL is required"], trim: true },
  created:{type:Date,default:Date.now}
});

module.exports=mongoose.model('Bookmark',BookMarkSchema);