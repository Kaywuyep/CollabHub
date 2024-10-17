const User = require("../models/usermodel");

const isAdmin = async (req, res, next) => {
  try {
    const id = req.params.id
    // Find the logged-in user
    const user = await User.findById({ _id: id});
    // Check if admin
    if (user._id.isAdmin) {
    // if (user && user.isAdmin) {
      next();
    }
  } catch (error) {
    next(new Error("Access denied, admin only"));
  }
};

module.exports = isAdmin;