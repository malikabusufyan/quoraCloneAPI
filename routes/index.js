const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controller for creating routes from them
const userController = require("../controllers/userController");
const quotationController = require("../controllers/quotationController");

//Creating API for singUP
router.post("/signup", userController.signUp);

//Creating API for singIn
router.post("/signin", userController.signIn);

//Creating API for Quotation
router.post(
  "/create-quotation",
  passport.authenticate("jwt", { session: false }),
  quotationController.createQuotation
);

//Api to get the user details
router.get(
  "/user-details",
  passport.authenticate("jwt", { session: false }),
  userController.userDetails
);
module.exports = router;
