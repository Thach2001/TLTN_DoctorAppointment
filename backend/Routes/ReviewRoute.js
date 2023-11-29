const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../Controllers/ReviewController");
const { authenticate, restrict } = require("../Auth/VerifyToken");

router
   .route("/")
   .get(reviewController.getAllReviews)
   .post(authenticate, restrict(["patient"]), reviewController.createReview);

router.get(
   "/getall",
   // authenticate,
   reviewController.getReviews
);

module.exports = router;
