const Service = require("../models/Service");
const Image = require("../models/Image");
const { validationResult } = require("express-validator");

exports.addService = async (req, res) => {
  const userId = req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(422).json(error);
  }

  const files = req.files;
  if (!files) {
    return res.status(422).json({ message: "Image is required" });
  }

  // prepare for image upload
  const myFiles = files.map(file => {
    return {
      filename: file.filename,
      path: file.destination,
      userId
    };
  });

  // image name
  const myFileNames = myFiles.map(i => {
    return {
      image: i.filename
    };
  });

  try {
    // save image in database
    await Image.create(myFiles);

    const { title, description, tags, packages } = req.body;

    const service = new Service({
      title,
      description,
      tags,
      packages: JSON.parse(packages),
      images: myFileNames,
      author: userId
    });

    await service.save();

    res.status(201).json({ message: "Service is added Successfully", service });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getServices = async (req, res) => {
  const perPage = 10;
  const currentPage = 1;

  try {
    const countDoc = await Service.countDocuments();
    const services = await Service.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .exec();
    res.status(200).json({ message: "Fetching Services is success", services });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getService = async (req, res) => {
  const serviceId = req.params.serviceId;
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service is not found!" });
    }

    res
      .status(200)
      .json({ message: "Service is fetching successfully", service: service });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Service is not found!" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};
