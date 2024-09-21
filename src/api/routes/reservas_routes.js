const express = require('express')
const ReservaRoutes = express.Router()
const { isAuth } = require('../middlewares/isAuth')
const {
  getReserva,
  postReserva,
  putReserva,
  deleteReserva
} = require('../controllers/reservas_controllers')

ReservaRoutes.get('/', getReserva)
ReservaRoutes.post('/newreserva', [isAuth], postReserva)
ReservaRoutes.put('/:id', [isAuth], putReserva)
ReservaRoutes.delete('/:id', [isAuth], deleteReserva)

module.exports = ReservaRoutes
