const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utilities/errorResponse')
const Room = require('../models/Room')

// @desc    Get all rooms
// @route   GET /api/v1/rooms
// @access  Public
exports.getRooms = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// @desc    Get single room
// @route   GET /api/v1/rooms/:id
// @access  Public
exports.getRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findById(req.params.id)
  
    if (!room) {
      return next(
        new ErrorResponse(`No room with that id of ${req.params.id}`)
      )
    }
  
    res.status(200).json({ success: true, data: room })
})

// @desc    create room
// @route   PUT /api/v1/rooms
// @access  Private/Admin
exports.createRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.create({
    ...req.body,
    created_by: req.user.id
  })
  return res.status(200).json({ success: true, data: room })
})

// @desc    Update room
// @route   PUT /api/v1/rooms/:id
// @access  Private/Admin
exports.updateRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findByIdAndUpdate(req.params.id, {...req.body, modified_by: req.user.id}, {
    new: true,
    runValidators: true
  })

  if (!room)
    return next(new ErrorResponse(`No room with that id of ${req.params.id}`))

  res.status(200).json({ success: true, data: room })
})

// @desc    Update room status
// @route   PUT /api/v1/rooms/:id
// @access  Private/Admin
exports.updateRoomStatus = asyncHandler(async (req, res, next) => {
  const room = await Room.findByIdAndUpdate(req.params.id, {status: req.body.status, modified_by: req.user.id}, {
    new: true,
    runValidators: true,
    context: 'query'
  })

  if (!room)
    return next(
      new ErrorResponse(`No room with that id of ${req.params.id}`)
    )

  res.status(200).json({ success: true, data: room })
})

// @desc    Delete room
// @route   DELETE /api/v1/rooms/:id
// @access  Private/Admin
exports.deleteRoom = asyncHandler(async (req, res, next) => {
  let room = await Room.findOne({ _id: req.params.id })

  if (!room) {
    return next(new ErrorResponse(`No room with id of ${req.params.id}`, 404))
  }

  await room.remove()
  return res.status(200).json({ success: true, room })
})
