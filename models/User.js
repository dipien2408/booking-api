const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'Please add a user name'],
        unique: true,
        uniqueCaseInsensitive: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        uniqueCaseInsensitive: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Must be six characters long'],
        select: false
    },
    phone: {
        type: String,
    },
    img: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/cnpm-30771.appspot.com/o/no-user.png?alt=media&token=517e08ab-6aa4-42eb-9547-b1b10f17caf0'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date,

}, { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true })

UserSchema.index({userName: 'text'})

// Encrypt Password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

UserSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('User', UserSchema)
