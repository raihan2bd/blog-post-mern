const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  feature: {
    type: Boolean,
    default: false
  },
  catId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  likes: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
      }
    }
  ],
  totalComments: {
    type: Number,
    required: true,
    default: 0
  },
  comments: [
    {
      comment: {
        _id: {
          type: Schema.Types.ObjectId,
          default: mongoose.Types.ObjectId
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true
        },
        avatar: {
          type: String,
          required: true
        },
        username: {
          type: String,
          required: true
        },
        text: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          required: true,
          default: Date.now
        },
        likes: [
          {
            userId: {
              type: Schema.Types.ObjectId,
              ref: "user",
              required: true
            }
          }
        ]
      },
      reply: [
        {
          userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
          },
          avatar: {
            type: String,
            required: true
          },
          username: {
            type: String,
            required: true
          },
          text: {
            type: String,
            required: true
          },
          date: {
            type: Date,
            required: true,
            default: Date.now
          },
          likes: [
            {
              userId: {
                type: Schema.Types.ObjectId,
                ref: "user",
                required: true
              }
            }
          ]
        }
      ]
    }
  ],

  tags: [
    {
      type: String
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  thumbnail: {
    type: String
  },
  thumbId: {
    type: Schema.Types.ObjectId,
    ref: "Image",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

PostSchema.index(
  { title: "text", content: "text", tags: "text" },
  {
    weights: {
      title: 5,
      tags: 3,
      content: 1
    }
  }
);

module.exports = mongoose.model("Post", PostSchema);
