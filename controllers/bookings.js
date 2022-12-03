const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utilities/errorResponse')
const permission = require('../utilities/permission')
const Booking = require('../models/Booking')

// @desc    Get all bookings
// @route   GET /api/v1/bookings
// @access  Private/Admin
exports.getBookings = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// @desc    Get single booking
// @route   GET /api/v1/bookings/:id
// @access  Private or Private/Admin
exports.getBooking = asyncHandler(async (req, res, next) => {
  permission(req, res, next, Booking, req.params.id)
    const booking = await Booking.findById(req.params.id)
  
    if (!booking) {
      return next(
        new ErrorResponse(`No booking with that id of ${req.params.id}`)
      )
    }
  
    res.status(200).json({ success: true, data: booking })
})

// @desc    Get bookings by logged in user
// @route   GET /api/v1/bookings/me
// @access  Private
exports.getLoggedInBookings = asyncHandler(async (req, res, next) => {
    const bookings = await Booking.find({ user_id: req.user.id })

    if (!bookings) {
      return next(
        new ErrorResponse(`No booking with that user id of ${req.user.id}`)
      )
    }
  
    res.status(200).json({ success: true, data: bookings })
})

// @desc    Get bookings by user id
// @route   GET /api/v1/bookings/user/:id
// @access  Private/Admin
exports.getUserBookings = asyncHandler(async (req, res, next) => {
    const bookings = await Booking.find({ user_id: req.params.id })
  
    if (!bookings) {
      return next(
        new ErrorResponse(`No booking with that user id of ${req.params.id}`)
      )
    }
  
    res.status(200).json({ success: true, data: bookings })
})

// @desc    create booking
// @route   POST /api/v1/booking
// @access  Private 
exports.createBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.create({
      ...req.body,
      user_id: req.user.id
    })
    return res.status(200).json({ success: true, data: booking })
})

// @desc    Update booking
// @route   PUT /api/v1/bookings/:id
// @access  Private or Private/Admin
exports.updateBooking = asyncHandler(async (req, res, next) => {
    permission(req, res, next, Booking, req.params.id)
    const booking = await Booking.findByIdAndUpdate(req.params.id, {...req.body, modified_by: req.user.id}, {
        new: true,
        runValidators: true
    })

    if (!booking)
        return next(new ErrorResponse(`No booking with that id of ${req.params.id}`))

    res.status(200).json({ success: true, data: booking })
})

// @desc    Delete booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private or Private/Admin
exports.deleteBooking = asyncHandler(async (req, res, next) => {
  permission(req, res, next, Booking, req.params.id)  
  let booking = await Booking.findOne({ _id: req.params.id })

    if (!booking) {
        return next(new ErrorResponse(`No booking with id of ${req.params.id}`, 404))
    }

    await booking.remove()
    return res.status(200).json({ success: true, data: booking })
})

  