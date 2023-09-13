const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceScema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [],
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  tags: [
    {
      type: String,
      required: true
    }
  ],
  packages: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("Service", ServiceScema);
