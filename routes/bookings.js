const express = require('express')
const router = express.Router()

const {
  getBookings,
  getBooking,
  getLoggedInBookings,
  getUserBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookings')

const Booking = require('../models/Booking')

const advancedResults = require('../middleware/advanceResults')
const { protect, authorize } = require('../middleware/auth')

router.get('/', protect, authorize("admin"), advancedResults(Booking), getBookings)
router.get('/:id', protect, getBooking)
router.get('/me', protect, getLoggedInBookings)
router.get('/user/:id', protect, authorize('admin'), getUserBookings)
router.post('/', protect, createBooking)
router.put('/:id', protect, updateBooking)
router.delete('/:id', protect, deleteBooking)

module.exports = router
