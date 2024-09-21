require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Conectado con éxito a la BBDD 😍')
  } catch (error) {
    console.error('no se puede conectar a la BBDD 😣', error)
  }
}
module.exports = { connectDB }
