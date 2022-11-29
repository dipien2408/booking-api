const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utilities/errorResponse')
const Hotel = require('../models/Hotel')

// @desc    Get all hotels
// @route   GET /api/v1/hotels
// @access  Public
exports.getHotels = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single hotel
// @route   GET /api/v1/hotels/:id
// @access  Public
exports.getHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id)

  if (!hotel) {
    return next(
      new ErrorResponse(`No hotel with that id of ${req.params.id}`)
    )
  }

  res.status(200).json({ success: true, data: hotel })
})

// @desc    Create single hotel
// @route   POST /api/v1/hotels/
// @access  Private/Admin
exports.createHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.create({
    ...req.body,
    created_by: req.user.id
  })

  return res.status(200).json({ success: true, data: hotel })
})

// @desc    Update single hotel
// @route   PUT /api/v1/hotels
// @access  Private/Admin
exports.updateHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, {...req.body, modified_by: req.user.id}, {
    new: true,
    runValidators: true,
    context: 'query'
  })

  if (!hotel)
    return next(
      new ErrorResponse(`No hotel with that id of ${req.params.id}`)
    )

  res.status(200).json({ success: true, data: hotel })
})

// @desc    Update single hotel status
// @route   PUT /api/v1/hotels/:id
// @access  Private/Admin
exports.updateHotelStatus = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, {status: req.body.status, modified_by: req.user.id}, {
    new: true,
    runValidators: true,
    context: 'query'
  })

  if (!hotel)
    return next(
      new ErrorResponse(`No hotel with that id of ${req.params.id}`)
    )

  res.status(200).json({ success: true, data: hotel })
})

// @desc    Delete single hotel
// @route   DELETE /api/v1/hotels/:id
// @access  Private/Admin
exports.deleteHotel = asyncHandler(async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.id)

  if (!hotel) {
    return next(
      new ErrorResponse(`No hotel with id of ${req.params.id}`, 404)
    )
  }

  await hotel.remove()

  return res.status(200).json({ success: true, hotel })
})
