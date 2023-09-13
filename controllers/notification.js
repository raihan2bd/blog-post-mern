const Notification = require("../models/Notification");

///get user notifications;
exports.getNotification = async (req, res) => {
  const userId = req.user.id;
  const perpage = 10;
  const page = +req.query.page || 1;
  try {
    /// count all notification belong to this user
    const totalNtfc = await Notification.find({
      to: userId
    }).countDocuments();

    /// hasNextPage condition;
    let hasNextPage = false;
    if (totalNtfc > perpage * page) {
      hasNextPage = true;
    }

    ///find all notification belong to this user
    const notifications = await Notification.find({ to: userId })
      .skip((page - 1) * perpage)
      .limit(perpage)
      .populate({
        path: "from",
        select: "username"
      })
      .sort({ date: -1 });

    /// filter unseen notification and count them
    const myntfc = notifications.filter(i => i.seen === false);
    const totalNotification = myntfc.length;

    //get notification _ids
    const updateNtfcIds = notifications.map(i => i._id);

    // update them to seen
    const updateNtfc = await Notification.updateMany(
      {
        _id: {
          $in: updateNtfcIds
        }
      },
      {
        $set: {
          seen: true
        }
      }
    );

    res
      .status(200)
      .json({ notifications: notifications, totalNotification, hasNextPage });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getTotalNotification = async (req, res) => {
  const userId = req.user.id;

  try {
    const totalNotification = await Notification.find({
      to: userId,
      seen: false
    }).countDocuments();
    res.status(200).json({
      message: "Fetch TotalNotification is success",
      totalNotification
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
