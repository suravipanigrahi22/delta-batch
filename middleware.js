const Listing=require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");

// middleware.js
module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.user);

    //middleware for authenticate before creating new listing
    if (!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;//id user perform any opreration it redirect to original url not /listings everytime
        req.flash("error", "You must be logged in to create a listing!");
        return res.redirect("/login");
    }
    next();
};
//If edit,addnew listing any operation done then it redirect to respective page not /listings everytime
module.exports.savedRedirectUrl = (req, res, next) => {
    // Check if the request is a GET request to /new or /edit
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
//Authrized owner only can dlete,edit,update otherwise error msg flashed
module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    //Before find and update it should check owner is cuurUser otherwise errror msg flashed
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "you are not the owner of this listing!");
       return res.redirect(`/listings/${id}`);
    }
    next();
};

// Define middleware for schema validation if an error occurs
module.exports. validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errorMsg); // send a 400 Bad Request response
    } else {
        next();
    }
};
module.exports.validateReview = (req, res, next) => {
    const { rating, comment } = req.body.review;
    if (!comment) {
        throw new ExpressError(400, 'Invalid review. "comment" is required.');
    }
    else {
        next();
    }
};
// The author creates a particular review that can only be deleted by that user, not others
module.exports.isReviewAuthor = async (req, res, next) => {
    try {
        let { id, reviewId } = req.params;
        let review = await Review.findById(reviewId);

        // Before find and update, it should check if the owner is currentUser; otherwise, an error message is flashed
        if (!review.author._id.equals(res.locals.currUser._id)) {
            req.flash("error", "You did not create this review!");
            return res.redirect(`/listings/${id}`);
        }
        next();
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
};
