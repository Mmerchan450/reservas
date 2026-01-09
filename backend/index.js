
import express from 'express'
import cors from 'cors'


import roomsRoutes from './src/routes/roomsRouter.js'
import reservationsRoutes from './src/routes/reservationsRouter.js'
import usersRoutes from './src/routes/usersRouter.js'

const app = express()
const PORT = process.env.PORT || 3000


app.use(cors()) // Permitir peticiones desde cualquier origen
app.use(express.json()) // Para parsear JSON
app.use(express.urlencoded({ extended: true })) // Para parsear datos de formularios


app.get('/', (req, res) => {
  res.send('API de Reservas funcionando ✅')
})


app.use('/api/rooms', roomsRoutes)
app.use('/api/reservations', reservationsRoutes)
app.use('/api/users', usersRoutes)


app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: 'Ruta no encontrada'
  })
})

// ---------------------
//  servidor
// ---------------------
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
})
