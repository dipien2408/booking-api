
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    discount: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    unavailableDates: {type: [Date]},
    hotel_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hotel',
        required: true
    },
    bedRoom: {
        type: Number,
        required: true,
    },
    roomType_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'RoomType',
        required: true
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

module.exports = mongoose.model("Room", RoomSchema);