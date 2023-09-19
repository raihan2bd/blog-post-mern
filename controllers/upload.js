const Image = require("../models/Image");

exports.postThumbnail = async (req, res) => {
  if (!req.file) {
    res.status(422).json({ message: "Post Thumbnail is required" });
  }
  const filename = req.file.filename;
  const path = `${req.file.destination}/${filename}`;
  userId = req.user.id;
  const thumbnail = new Image({
    filename,
    path,
    userId
  });

  await thumbnail.save();
  res.status(201).json({
    message: "Thumbnail is uploaded successfully!",
    thumbnail: thumbnail.path
  });
};
