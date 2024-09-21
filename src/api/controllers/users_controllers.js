const User = require('../models/user_model')
const { generateToken } = require('../utils/jwt')
const bcrypt = require('bcrypt')

const registerUser = async (req, res, next) => {
  try {
    req.body.rol = 'user'
    const user = new User(req.body)
    const userDuplicated = await User.findOne({ email: req.body.email })
    if (userDuplicated) {
      return res.status(400).json('Este usuario ya está registrado')
    } else {
      const userSaved = await user.save()
      return res.status(201).json(userSaved)
    }
  } catch (error) {
    return res.status(400).json({
      message: 'Ha ocurrido un error en el registro',
      error: error.message
    })
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user._id)
        return res.status(200).json({ user, token })
      } else {
        return res.status(400).json({ message: 'contraseña no encontrado' })
      }
    } else {
      return res.status(400).json({ message: 'Usuario no encontrado' })
    }
  } catch (error) {
    return res.status(400).json({
      message: 'Ha ocurrido un error en el login',
      error: error.message
    })
  }
}
const getUsers = async (req, res, next) => {
  try {
    const userRequesting = req.user
    if (userRequesting.rol === 'user') {
      return res
        .status(403)
        .json('No puedes acceder a los datos si no eres admin')
    }
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json('error en el getUsers')
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userRequesting = req.user
    if (userRequesting.rol === 'user' && userRequesting._id.toString() !== id) {
      return res.status(400).json('No puedes eliminar a otros usuarios')
    }
    const userDeleted = await User.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'User eliminado',
      User: userDeleted
    })
  } catch (error) {
    return res.status(400).json('Hay un error borrando el user')
  }
}
const putUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userRequesting = req.user

    if (userRequesting.rol === 'user' && userRequesting._id.toString() !== id) {
      return res
        .status(403)
        .json({ message: 'No puedes actualizar a otros usuarios' })
    }

    if (userRequesting.rol === 'user' && req.body.rol) {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para cambiar el rol' })
    }

    const updates = req.body

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    })

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(400).json({
      message: 'Error actualizando el usuario',
      error: error.message
    })
  }
}
module.exports = { registerUser, loginUser, getUsers, deleteUser, putUser }
