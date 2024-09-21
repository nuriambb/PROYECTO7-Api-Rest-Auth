const UserRoutes = require('express').Router()
const { isAuth } = require('../middlewares/isAuth')
const {
  registerUser,
  loginUser,
  getUsers,
  putUser,
  deleteUser
} = require('../controllers/users_controllers')

UserRoutes.post('/register', registerUser)
UserRoutes.post('/login', loginUser)
UserRoutes.get('/', [isAuth], getUsers)
UserRoutes.put('/:id', [isAuth], putUser)
UserRoutes.delete('/:id', [isAuth], deleteUser)

module.exports = UserRoutes
