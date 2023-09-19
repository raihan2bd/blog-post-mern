require('dotenv').config()
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const uploadRoutes = require("./routes/upload");
const profileRoutes = require("./routes/profile");
const postRoutes = require("./routes/post");
const adminRoutes = require("./routes/admin");
const serviceRoutes = require("./routes/service");
const notificationRoutes = require("./routes/notification");
const otherRoutes = require("./routes/other");

// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middlewares
app.use(express.json({ extended: false }));

//route for serving images
const conn = mongoose.connection;

let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});

app.get("/images/:imageName", (req, res) => {
  const filename = req.params.imageName;
  gfs.find({ filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ message: "No File Exist" });
    }
    gfs.openDownloadStreamByName(filename).pipe(res);
  });
});

app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/profile", serviceRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/other", otherRoutes);

// admin Routes
app.use("/api/admin", adminRoutes);

// // 404 Error handing middleware
// app.use("/", (req, res) => {
//   res.status(404).json({ message: "404 Page Not Found!" });
// });

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

// // Error Handing middleware
// app.use((error, req, res, next) => {
//   console.log(error.message);
//   console.log(error);
//   res.json(error);
// });

app.listen(PORT, () => {
  console.log(
    "Server is running on port ",
    PORT,
    "and the url is http://localhost:5000"
  );
});
