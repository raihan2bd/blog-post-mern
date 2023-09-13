const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  msg: {
    type: String,
    required: true
  },
  seen: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Post"
  },
  comId: {
    type: String
  },
  repId: {
    type: String
  },
  title: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Notification", NotificationSchema);
