const express = require("express");
const router = express.Router();

//Import controller for creating routes from them
const userController = require("../controllers/userController");

//Creating API for singUP
router.post("/signup", userController.signUp);

//Creating API for singIn
router.post("/signin", userController.signIn);
module.exports = router;
