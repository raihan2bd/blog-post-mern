const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  path: {
    type: String
  },
  fileId: {
    type: Schema.Types.ObjectId
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Image", ImageSchema);
