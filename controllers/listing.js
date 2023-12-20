//MVC Model implementation the server part of all routes in this model will implemented
const Listing = require("../models/listing");

// Index Route
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// Render New Form Route
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Create New Listing Route
module.exports.createNewListing = async (req, res, next) => {
  let url=req.file.path;
  let filename=req.file.filename;
  console.log(url,"..",filename);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image={url,filename};//add value to image to store in database
  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listings");
};

// Show Listing Route
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// Render Edit Form Route
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
let originalImageUrl=listing.image.url;
originalImageUrl.replace("/upload","/upload/w_250");//we change the orginal image size to fix 300 weidth size from cloudinary and pass to edit .ejs
  res.render("listings/edit.ejs", { listing ,originalImageUrl});
};

// Update Listing Route
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
 let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });
 //at the time of edit we update image also
 if(typeof req.file!=="undefined"){//in req file not exit not wroking
 let url=req.file.path;
 let filename=req.file.filename;
 listing.image={url,filename};
 await listing.save();
 }
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

// Delete Listing Route
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};
