require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const UserRoutes = require('./src/api/routes/users_routes')
const EventoRoutes = require('./src/api/routes/eventos_routes')
const ReservaRoutes = require('./src/api/routes/reservas_routes')
const app = express()
app.use(express.json())

app.use('/api/v1/user', UserRoutes)
app.use('/api/v1/evento', EventoRoutes)
app.use('/api/v1/reserva', ReservaRoutes)
connectDB()
app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000')
})
