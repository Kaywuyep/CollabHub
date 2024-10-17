const express = require("express");
const User = require("../models/usermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();

const {
    getUsers,
    getUserProfile,
    registerUser,
    loginUser,
    updateById,
    deleteUsers,
} = require("../controllers/userController");


router.get("/", getUsers);
router.get("/:id", isLoggedIn, getUserProfile);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/update/:id", isLoggedIn, updateById)
router.delete("/delete/:id", isLoggedIn, deleteUsers);


module.exports = router;