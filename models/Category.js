const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  thumbnail: {
    type: String
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Category", CategorySchema);
