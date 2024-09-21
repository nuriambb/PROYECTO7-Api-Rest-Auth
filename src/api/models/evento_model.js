const mongoose = require('mongoose')
const eventoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    location: { type: String, requied: true, trim: true },
    capacity: { type: Number, require: true, trim: true }
  },
  { timestamps: true }
)

const Evento = mongoose.model('eventos', eventoSchema, 'eventos')

module.exports = Evento
