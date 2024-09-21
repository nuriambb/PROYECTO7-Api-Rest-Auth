const Reserva = require('../models/reserva_model')
const User = require('../models/user_model')

const getReserva = async (req, res, next) => {
  try {
    const reservas = await Reserva.find()
      .populate('user', 'id name')
      .populate('event', 'id title')

    return res.status(200).json(reservas)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'No se ha podido acceder a las reservas', error })
  }
}

const postReserva = async (req, res, next) => {
  try {
    const userRequesting = req.user

    const { user: userIdInRequest, event: eventIdInRequest } = req.body


    const existingReserva = await Reserva.findOne({
      user: userIdInRequest,
      event: eventIdInRequest
    })

    if (existingReserva) {
      return res
        .status(400)
        .json({ message: 'El usuario ya tiene una reserva para este evento.' })
    }

    if (
      userRequesting.rol === 'user' &&
      userRequesting._id.toString() !== userIdInRequest
    ) {
      return res
        .status(403)
        .json({ message: 'No puedes crear reservas para otros usuarios.' })
    }

    const newReserva = new Reserva(req.body)
    const reservaSaved = await newReserva.save()

    const reservaWithEvento = await Reserva.findById(reservaSaved._id)
      .populate('user', 'id name')
      .populate('event', 'id title')
    return res.status(201).json(reservaWithEvento)
  } catch (error) {
    return res.status(400).json({
      message: 'No se ha podido crear la reserva',
      error: error.message
    })
  }
}

const putReserva = async (req, res, next) => {
  try {
    const { id } = req.params
    const userRequesting = req.user

    if (userRequesting.rol !== 'admin') {
      return res.status(403).json({
        message: 'Solo los administradores pueden actualizar reservas'
      })
    }

    const reserva = await Reserva.findById(id)

    if (!reserva) {
      return res.status(404).json({
        message: 'Reserva no encontrada'
      })
    }
    const newReserva = new Reserva(req.body)
    newReserva._id = id

    const reservaUpdate = await Reserva.findByIdAndUpdate(id, newReserva, {
      new: true
    })
    return res.status(200).json(reservaUpdate)
  } catch (error) {
    return res.status(400).json({
      message: 'No puedes actualizar reservas de otros usuarios',
      error: error.message
    })
  }
}

const deleteReserva = async (req, res, next) => {
  try {
    const { id } = req.params //id en la URL
    const userRequesting = req.user //usuario autenticado

    const reserva = await Reserva.findById(id) //reserva id en la url
    if (!reserva) {
      return res.status(404).json({
        message: 'Reserva no encontrada'
      })
    }

    const idUserReserva = reserva.user._id
    if (!idUserReserva) {
      const reservaDeletednoUser = await Reserva.findByIdAndDelete(id).populate(
        'event',
        'id title'
      )
      return res.status(200).json({
        message: 'Reserva sin usuario eliminada',
        reserva: reservaDeletednoUser
      })
    }

    if (
      userRequesting.rol === 'user' &&
      idUserReserva.toString() !== userRequesting._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: 'No puedes eliminar reservas de otros usuarios' })
    }

    const reservaDeleted = await Reserva.findByIdAndDelete(id).populate(
      'event',
      'id title'
    )

    return res.status(200).json({
      message: 'Se ha eliminado la reserva correctamente',
      reserva: reservaDeleted
    })
  } catch (error) {
    return res.status(400).json({
      message: 'No se ha podido eliminar la reserva',
      error: error.message
    })
  }
}
module.exports = { getReserva, postReserva, putReserva, deleteReserva }
