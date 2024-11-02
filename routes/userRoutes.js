const express = require("express");
const User = require("../models/usermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();

const {
    getUsers,
    getUserProfile,
    registerUser,
    loginUser,
} = require("../controllers/userController");


router.get("/", getUsers);
router.get("/:id", isLoggedIn, getUserProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;