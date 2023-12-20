// All routing part of listing here MVC model implement for better management
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer=require('multer');//multer for parsing files to uplaod in server
const{storage}=require("../cloudconfig.js")//require things from clodinary file
const upload=multer({storage});//Folder to upload files initialization

// Import the controller functions
const { index, renderNewForm, createNewListing, showListing, renderEditForm, updateListing, deleteListing } = require("../controllers/listing.js");
// Index route and Create route comes to same route req "/" so put in same block of router.routes
router.route("/")
.get( wrapAsync(index))
 .post(
     isLoggedIn, 
     upload.single('listing[image]'),
     validateListing,
      wrapAsync(createNewListing)
);

// New Route or Create Route
router.get("/new", isLoggedIn, renderNewForm);

// Show or Read Route
router.get("/:id", wrapAsync(showListing));



// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

// UPDATE Route
router.put("/:id", isLoggedIn, isOwner,      upload.single('listing[image]'),
validateListing, wrapAsync(updateListing));

// DELETE Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing));

module.exports = router;
