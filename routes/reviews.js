const express = require('express')
const router = express.Router()

const {
  getReviews,
  getReviewsByRoomId,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews')

const Review = require('../models/Review')

const advancedResults = require('../middleware/advanceResults')
const { protect, authorize } = require('../middleware/auth')

router.get('/', protect, authorize("admin"), advancedResults(Review), getReviews)
router.get('/:roomId', getReviewsByRoomId)
router.post('/:roomId', protect, createReview)
router.put('/:id', protect, updateReview)
router.delete('/:id', protect, deleteReview)

module.exports = router
