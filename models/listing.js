// Importing the mongoose library
const mongoose = require("mongoose");

// Extracting the Schema class from mongoose
const Schema = mongoose.Schema;

// Defining a new schema for a listing using the Schema class
const listingSchema = new Schema({
    // Title of the listing, a required field
    title: {
        type: String,
        required: true,
    },
    // Description of the listing, optional
    description: String,
    // Image URL for the listing, with a default placeholder if not provided
    image: {
        url: String,
        filename:String,
       },
    // Price of the listing, a numerical value
    price: Number,
    // Location and country information for the listing
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    // catagory:{
    //     typr:String,
    //     enum:["mountain","arctic","farms","rooms"]
    // }
});

// Handle delete listing and corresponding reviews deleted Middleware defined
// If listing is deleted, related reviews will also be deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await mongoose.model("Review").deleteMany({ _id: { $in: listing.reviews } });
    }
});

// Creating a Mongoose model named "Listing" using the listingSchema
const Listing = mongoose.model("Listing", listingSchema);

// Exporting the Listing model to be used in other parts of the application
module.exports = Listing;
