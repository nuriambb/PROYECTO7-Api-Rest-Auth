const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    rol: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: true
    },
    reservas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reservas',
      required: false,
      default: null
    }]
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

const User = mongoose.model('users', userSchema, 'users')
module.exports = User
