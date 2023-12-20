const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewsController = require("../controllers/review.js");
const review=require("../models/review.js");
// Reviews-POST ROUTES
// Create Route and error handling if wrong input comes
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewsController.createReview));

// Delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewsController.deleteReview));

module.exports = router;
