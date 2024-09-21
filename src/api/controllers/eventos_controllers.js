const Evento = require('../models/evento_model')
const User = require("../models/user_model")

const getEvento = async (req, res, next) => {
  try {
    const eventos = await Evento.find()
    return res.status(200).json(eventos)
  } catch (error) {
    return res.status(400).json('No se ha podido acceder a los eventos', error)
  }
}

const postEvento = async (req, res, next) => {
  try {
    const userRequesting = req.user
    if (userRequesting.rol === 'user') {
      return res
        .status(403)
        .json('No puedes crear un evento si no eres admin')
    }
    const newEvento = new Evento(req.body)
    const eventoSaved = await newEvento.save()
    return res.status(200).json(eventoSaved)
  } catch (error) {
    return res.status(400).json('No se ha podido crear el evento', error)
  }
}

const putEvento = async (req, res, next) => {
  try {
    const userRequesting = req.user
    if (userRequesting.rol === 'user') {
      return res
        .status(403)
        .json('No puedes actualizar un evento si no eres admin')
    }
    const { id } = req.params
    const newEvento = new Evento(req.body)
    newEvento._id = id

    const eventoUpdate = await Evento.findByIdAndUpdate(id, newEvento, {
      new: true
    })
    return res.status(200).json(eventoUpdate)
  } catch (error) {
    return res.status(400).json('No se ha podido actualizar el evento', error)
  }
}

const deleteEvento = async (req, res, next) => {
  try {
    const userRequesting = req.user
    if (userRequesting.rol === 'user') {
      return res
        .status(403)
        .json('No puedes eliminar un evento si no eres admin')
    }
    const { id } = req.params
    const eventoDeleted = await Evento.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Se ha eliminado el evento correctamente',
      evento: eventoDeleted
    })
  } catch (error) {
    return res.status(400).json('No se ha podido eliminar el evento', error)
  }
}
module.exports = { getEvento, postEvento, putEvento, deleteEvento }
