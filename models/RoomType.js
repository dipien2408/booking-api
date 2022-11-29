const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RoomTypeSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [3, 'Title must be three characters long'],
      trim: true,
      unique: true,
      uniqueCaseInsensitive: true,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      minlength: [3, 'Description must be three characters long'],
      required: [true, 'Description is required'],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },
    created_by: {
      type: mongoose.Schema.ObjectId,
      ref: 'Room',
    },
    modified_by: {
      type: mongoose.Schema.ObjectId,
      ref: 'Room',
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('RoomType', RoomTypeSchema)
