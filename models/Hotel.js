
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const HotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    
    desc: {
      type: String,
      required: true,
    },
    
    img: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
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
);

module.exports = mongoose.model("Hotel", HotelSchema);