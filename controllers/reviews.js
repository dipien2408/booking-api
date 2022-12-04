const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utilities/errorResponse')
const permission = require('../utilities/permission')
const filterData = require('../utilities/filterData')

const Review = require('../models/Review')
const Room = require('../models/Room')

// @desc    Get reviews
// @route   GET /api/v1/reviews
// @access  Private/Admin
exports.getReviews = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get review by room id
// @route   GET /api/v1/reviews/:roomId/
// @access  Public
exports.getReviewsByRoomId = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({ room_id: req.params.roomId })
    .populate({ path: 'user_id', select: 'userName img' })
    .sort('-createdAt')

  if (!reviews) {
    return next(
      new ErrorResponse(
        `No review with that room id of ${req.params.roomId}`
      )
    )
  }

  res.status(200).json({ success: true, data: reviews })
})

// @desc    Create review
// @route   POST /api/v1/reviews/:roomId
// @access  Private
exports.createReview = asyncHandler(async (req, res, next) => {
  let room = await Room.findOne({
    _id: req.params.roomId,
  })

  if (!room) {
    return next(
      new ErrorResponse(`No room with id of ${req.body.roomId}`, 404)
    )
  }
  const review = await Review.create({
    content: req.body.content,
    room_id: req.params.roomId,
    user_id: req.user._id
  })

  return res.status(200).json({ success: true, data: review })
})

// @desc    Update review
// @route   PUT /api/v1/reviews/:id
// @access  Private 
exports.updateReview = asyncHandler(async (req, res, next) => {
  permission(req, res, next, Review, req.params.id)
  let review = await Review.findById(req.params.id)

  if (!review) {
    return next(
      new ErrorResponse(`No review with id of ${req.params.id}`, 404)
    )
  }

  if (
    review.user_id.toString() == req.user._id.toString()
  ) {
    review.content = req.body.content;
    await review.save();

    res.status(200).json({ success: true, data: review })
  } else {
    return next(
      new ErrorResponse(`You are not authorized to update this review`, 400)
    )
  }
})

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private or Private/Admin
exports.deleteReview = asyncHandler(async (req, res, next) => {
  permission(req, res, next, Review, req.params.id)
  let review = await Review.findById(req.params.id)

  if (!review) {
    return next(
      new ErrorResponse(`No review with id of ${req.params.id}`, 404)
    )
  }

  if (
    review.user_id.toString() == req.user._id.toString()
  ) {
    await review.remove()
  } else {
    return next(
      new ErrorResponse(`You are not authorized to delete this review`, 400)
    )
  }

  return res.status(200).json({ success: true, review })
})
