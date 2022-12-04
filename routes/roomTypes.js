const express = require('express')
const router = express.Router()

const {
  getRoomTypes,
  getRoomType,
  createRoomType,
  updateRoomType,
  updateRoomTypeStatus,
  deleteRoomType,
} = require('../controllers/roomTypes')

const RoomType = require('../models/RoomType')

const advancedResults = require('../middleware/advanceResults')
const {protect, authorize} = require('../middleware/auth')

router.get('/', advancedResults(RoomType), getRoomTypes)
router.get('/:id', getRoomType)
router.post('/', protect, authorize('admin'), createRoomType)
router.put('/:id', protect, authorize('admin'), updateRoomType)
router.put('/status/:id', protect, authorize('admin'), updateRoomTypeStatus)
router.delete('/:id', protect, authorize('admin'), deleteRoomType)

module.exports = router