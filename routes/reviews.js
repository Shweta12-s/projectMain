const express = require('express');
const router = express.Router({mergeParams: true});

const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware.js');

const Campground  = require('../views/models/campground.js');
const Review = require('../views/models/review.js');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError.js');
const catchAsync=  require('../utils/catchAsync.js');

const { reviewSchema} = require('../schemas.js');








router.post('/',isLoggedIn, validateReview ,catchAsync(reviews.createReview));



router.delete('/:reviewId',  isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));


module.exports = router;