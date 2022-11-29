const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utilities/errorResponse')
const RoomType = require('../models/RoomType')

// @desc    Get all Room Type
// @route   GET /api/v1/roomTypes
// @access  Public
exports.getRoomTypes = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single Room Type
// @route   GET /api/v1/roomTypes/:id
// @access  Public
exports.getRoomType = asyncHandler(async (req, res, next) => {
  const roomType = await RoomType.findById(req.params.id)

  if (!roomType) {
    return next(
      new ErrorResponse(`No room type with that id of ${req.params.id}`)
    )
  }

  res.status(200).json({ success: true, data: roomType })
})

// @desc    Create single Room Type
// @route   POST /api/v1/roomTypes/
// @access  Private/Admin
exports.createRoomType = asyncHandler(async (req, res, next) => {
  const roomType = await RoomType.create({
    ...req.body,
    created_by: req.user.id
  })

  return res.status(200).json({ success: true, data: roomType })
})

// @desc    Update single Room Type
// @route   PUT /api/v1/roomTypes/:id
// @access  Private/Admin
exports.updateRoomType = asyncHandler(async (req, res, next) => {
  const roomType = await RoomType.findByIdAndUpdate(req.params.id, {...req.body, modified_by: req.user.id}, {
    new: true,
    runValidators: true,
    context: 'query'
  })

  if (!roomType)
    return next(
      new ErrorResponse(`No room type with that id of ${req.params.id}`)
    )

  res.status(200).json({ success: true, data: roomType })
})

// @desc    Update single Room Type status
// @route   PUT /api/v1/roomTypes
// @access  Private/Admin
exports.updateRoomTypeStatus = asyncHandler(async (req, res, next) => {
  const roomType = await RoomType.findByIdAndUpdate(req.params.id, {status: req.body.status, modified_by: req.user.id}, {
    new: true,
    runValidators: true,
    context: 'query'
  })

  if (!roomType)
    return next(
      new ErrorResponse(`No room type with that id of ${req.params.id}`)
    )

  res.status(200).json({ success: true, data: roomType })
})


// @desc    Delete single Room Type
// @route   DELETE /api/v1/roomTypes/:id
// @access  Private/Admin
exports.deleteRoomType = asyncHandler(async (req, res, next) => {
  let roomType = await RoomType.findById(req.params.id)

  if (!roomType) {
    return next(
      new ErrorResponse(`No room type with id of ${req.params.id}`, 404)
    )
  }

  await roomType.remove()

  return res.status(200).json({ success: true, roomType })
})
