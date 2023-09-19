const GridStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");

const storage = new GridStorage({
  url: process.env.MongoDBURI,
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buff) => {
        if (err) {
          return reject(err);
        }
        const filename = buff.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

module.exports = storage;
