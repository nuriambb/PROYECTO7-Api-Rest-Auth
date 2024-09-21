const mongoose = require('mongoose')

const reservaSchema = new mongoose.Schema(
  {
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        trim: true
      }
    ],
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'eventos',
      required: true,
      trim: true
    },
    date: { type: String, required: true, trim: true }
  },
  {
    timestamps: true
  }
)
const Reserva = mongoose.model('reservas', reservaSchema, 'reservas')

module.exports = Reserva
