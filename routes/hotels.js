const express = require('express')
const router = express.Router()

const {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  updateHotelStatus,
  deleteHotel,
} = require('../controllers/hotels')

const Hotel = require('../models/Hotel')

const advancedResults = require('../middleware/advanceResults')
const {protect, authorize} = require('../middleware/auth')

router.get('/', advancedResults(Hotel), getHotels)
router.get('/:id', getHotel)
router.post('/', protect, authorize('admin'), createHotel)
router.put('/:id', protect, authorize('admin'), updateHotel)
router.put('/:id', protect, authorize('admin'), updateHotelStatus)
router.delete('/:id', protect, authorize('admin'), deleteHotel)

module.exports = router