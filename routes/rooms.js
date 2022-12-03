const express = require('express')
const router = express.Router()

const {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  updateRoomRating,
  updateRoomStatus,
  deleteRoom,
} = require('../controllers/rooms')

const Room = require('../models/Room')

const advancedResults = require('../middleware/advanceResults')
const {protect, authorize} = require('../middleware/auth')

router.get('/', advancedResults(Room), getRooms)
router.get('/:id', getRoom)
router.post('/', protect, authorize('admin'), createRoom)
router.put('/:id', protect, authorize('admin'), updateRoom)
router.put('/rating/:id', protect, authorize('admin'), updateRoomRating)
router.put('/status/:id', protect, authorize('admin'), updateRoomStatus)
router.delete('/:id', protect, authorize('admin'), deleteRoom)

module.exports = router