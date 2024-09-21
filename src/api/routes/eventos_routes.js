const express = require('express')
const EventoRoutes = express.Router()
const { isAuth } = require('../middlewares/isAuth')
const {
  getEvento,
  postEvento,
  putEvento,
  deleteEvento
} = require('../controllers/eventos_controllers')

EventoRoutes.get('/', getEvento)
EventoRoutes.post('/', [isAuth], postEvento)
EventoRoutes.put('/:id', [isAuth], putEvento)
EventoRoutes.delete('/:id', [isAuth], deleteEvento)

module.exports = EventoRoutes
