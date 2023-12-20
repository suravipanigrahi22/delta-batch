const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const usersController = require("../controllers/users");

// GET /signup method
router.get("/signup", usersController.renderSignupForm);

// POST - Sign up method with successful registered msg
router.post("/signup", wrapAsync(usersController.signup));

// GET method /login
router.get("/login", usersController.renderLoginForm);

// POST method /login and middleware passport define for login authentication
router.post("/login", savedRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}), wrapAsync(usersController.login));

// Add this middleware to handle authentication failure and display flash messages
router.use("/login", usersController.handleLoginError);

// Logout user
router.get("/logout", wrapAsync(usersController.logout));

module.exports = router;
