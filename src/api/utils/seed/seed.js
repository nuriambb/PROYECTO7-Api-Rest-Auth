const mongoose = require('mongoose')
const Evento = require('../../models/evento_model')

const eventosData = [
  {
    title: 'Teatro Clásico',
    date: '25/12/2024',
    location: 'Teatro Municipal - Madrid',
    capacity: 300
  },
  {
    title: 'Festival de Comida',
    date: '12/06/2025',
    location: 'Plaza Central- Murcia',
    capacity: 500
  }
]

const seedEventos = async () => {
  try {

    await mongoose.connect('mongodb+srv://proyecto7-nuria:aIRuv2EwLPodCiqH@proyecto7.ta2bc.mongodb.net/?retryWrites=true&w=majority&appName=Proyecto7', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })


    for (const eventoData of eventosData) {
      const existingEvento = await Evento.findOne({ title: eventoData.title })

      if (!existingEvento) {
        const evento = new Evento(eventoData)
        await evento.save()
        console.log(`Evento creado: ${evento.title}`)
      } else {
        console.log(`El evento ${eventoData.title} ya existe.`)
      }
    }

    console.log('Semilla completada')
  } catch (error) {
    console.error('Error al sembrar eventos:', error)
  } finally {
    await mongoose.disconnect()
  }
}

seedEventos()
