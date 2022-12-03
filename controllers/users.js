const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utilities/errorResponse')
const User = require('../models/User')

// @desc    Get all users
// @route   GET /api/v1/auth/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single user
// @route   GET /api/v1/auth/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user)
    return next(new ErrorResponse(`No user with that id of ${req.params.id}`))

  res.status(200).json({ success: true, data: user })
})

// @desc    Create user
// @route   POST /api/v1/auth/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  selectedField = ["userName", "email", "password", "phone", "img", "role"]
  let data = filterData(selectedField, req.body);
  const user = await User.create(data)

  res.status(201).json({ success: true, data: user })
})

// @desc    Update user
// @route   PUT /api/v1/auth/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  selectedField = ["userName", "email", "phone", "img", "role"]
  let data = filterData(selectedField, req.body);

  const user = await User.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
    context: 'query'
  })

  if (!user)
    return next(new ErrorResponse(`No user with that id of ${req.params.id}`))

  res.status(200).json({ success: true, data: user })
})

// @desc    Delete user
// @route   DELETE /api/v1/auth/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user)
    return next(new ErrorResponse(`No user with that id of ${req.params.id}`))

  await User.findByIdAndDelete(req.params.id)

  res.status(200).json({ success: true, data: {} })
})
