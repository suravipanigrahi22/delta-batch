const Joi = require('joi');

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comments: Joi.string().required()
    }).required()
});

const listingSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  image: Joi.string().default("https://unsplash.com/s/photos/sea-beach").allow(''),
  price: Joi.number(),
  location: Joi.string(),
  country: Joi.string(),
  reviews: Joi.array().items(reviewSchema),  // Update this based on your actual schema for reviews
}).options({ allowUnknown: true });

module.exports = {
  reviewSchema,
  listingSchema,
};

module.exports = {
    reviewSchema,
    listingSchema,
};
