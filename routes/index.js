const express = require("express");
const router = express.Router();
const passport = require("passport");

// import the { check } from express-validator
const { check } = require("express-validator");

const validate = [
  check("email", "Must be an email").isEmail(),
  check("name", "Must not be empty").isLength({ min: 1 }),
  check("password")
    .matches(/.*[A-Z].*/)
    .withMessage("Password must contain atleast one upperCase")
    .matches(/.*[0-9].*/)
    .withMessage("Password must contain atleast one number")
    .matches(/.*[a-z].*/)
    .withMessage("Password must contain atleast one lowercase letter"),
];

const contentValidate = [check("content", "It shoud not be empty").notEmpty()];

//Import controller for creating routes from them
const userController = require("../controllers/userController");
const quotationController = require("../controllers/quotationController");

//Creating API for singUP
console.log("Routes aa raha hai");
router.post("/signup", validate, userController.signUp);

//Creating API for singIn
router.post("/signin", userController.signIn);

//Creating API for Quotation
router.post(
  "/create-quotation",
  contentValidate,
  passport.authenticate("jwt", { session: false }),
  quotationController.createQuotation
);

//Api to get the user details
router.get(
  "/user-details",
  passport.authenticate("jwt", { session: false }),
  userController.userDetails
);

// API to get all quotations
router.get(
  "/quotations",
  passport.authenticate("jwt", { session: false }),
  quotationController.allQuotations
);

module.exports = router;
