// backend/src/controllers/reservationsController.js
import {
  findAllReservations,
  findReservationById,
  createReservation,
  updateReservation,
  deleteReservation
} from '../models/reservationsModel.js'

function validateReservation({ room_id, user_id, start_time, end_time }) {
  if (!Number.isInteger(room_id) || room_id <= 0) return 'room_id inválido'
  if (!Number.isInteger(user_id) || user_id <= 0) return 'user_id inválido'
  if (!start_time || !end_time) return 'start_time y end_time son obligatorios'
  return null
}

// GET /api/reservations
export async function getAllReservations(req, res) {
  try {
    const reservations = await findAllReservations()
    res.json({ ok: true, count: reservations.length, data: reservations })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Error interno al obtener las reservas' })
  }
}

// GET /api/reservations/:id
export async function getReservationById(req, res) {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'El id debe ser un número entero' })

  try {
    const reservation = await findReservationById(id)
    if (!reservation) return res.status(404).json({ ok: false, error: `No existe reserva con id ${id}` })
    res.json({ ok: true, data: reservation })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Error interno al obtener la reserva' })
  }
}

// POST /api/reservations
export async function createReservationHandler(req, res) {
  const { room_id, user_id, start_time, end_time } = req.body
  const validationError = validateReservation({ room_id, user_id, start_time, end_time })
  if (validationError) return res.status(400).json({ ok: false, error: validationError })

  try {
    const newReservation = await createReservation({ room_id, user_id, start_time, end_time })
    res.status(201).json({ ok: true, message: 'Reserva creada correctamente', data: newReservation })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Error interno al crear la reserva' })
  }
}

// PUT /api/reservations/:id
export async function updateReservationHandler(req, res) {
  const id = Number(req.params.id)
  const { room_id, user_id, start_time, end_time } = req.body
  if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'El id debe ser un número entero' })

  const validationError = validateReservation({ room_id, user_id, start_time, end_time })
  if (validationError) return res.status(400).json({ ok: false, error: validationError })

  try {
    const existing = await findReservationById(id)
    if (!existing) return res.status(404).json({ ok: false, error: `No existe reserva con id ${id}` })

    const updated = await updateReservation({ id, room_id, user_id, start_time, end_time })
    res.json({ ok: true, message: 'Reserva actualizada correctamente', data: updated })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Error interno al actualizar la reserva' })
  }
}

// DELETE /api/reservations/:id
export async function deleteReservationHandler(req, res) {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'El id debe ser un número entero' })

  try {
    const existing = await findReservationById(id)
    if (!existing) return res.status(404).json({ ok: false, error: `No existe reserva con id ${id}` })

    await deleteReservation(id)
    res.json({ ok: true, message: 'Reserva eliminada correctamente' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Error interno al eliminar la reserva' })
  }
}
