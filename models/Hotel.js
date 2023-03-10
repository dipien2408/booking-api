
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
        default: 'https://firebasestorage.googleapis.com/v0/b/cnpm-30771.appspot.com/o/no-user.png?alt=media&token=517e08ab-6aa4-42eb-9547-b1b10f17caf0',
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    address: {
      type: String,
      enum: ['Ha Noi', 'Ho Chi Minh', 'Da Nang']
    },
    ratingHistory: [{
      type: Number,
      min: 0,
      max: 5
    }],
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

HotelSchema.virtual('rooms', {
  ref: 'Room',
  localField: '_id',
  foreignField: 'hotel_id',
  justOne: false,

  options: { sort: { name: -1 } }
})

module.exports = mongoose.model("Hotel", HotelSchema);