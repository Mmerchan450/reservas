// backend/src/models/reservationsModel.js
import pool from '../config/db.js'

// Devuelve todas las reservas
export async function findAllReservations() {
  const [rows] = await pool.query(
    'SELECT id, room_id, user_id, start_time, end_time, created_at FROM reservations'
  )
  return rows
}

// Devuelve una reserva por id (o null si no existe)
export async function findReservationById(id) {
  const [rows] = await pool.query(
    'SELECT id, room_id, user_id, start_time, end_time, created_at FROM reservations WHERE id = ?',
    [id]
  )
  return rows[0] || null
}

// Crea una reserva y devuelve el nuevo registro
export async function createReservation({ room_id, user_id, start_time, end_time }) {
  const now = new Date()
  const [result] = await pool.query(
    'INSERT INTO reservations (room_id, user_id, start_time, end_time, created_at) VALUES (?, ?, ?, ?, ?)',
    [room_id, user_id, start_time, end_time, now]
  )

  return {
    id: result.insertId,
    room_id,
    user_id,
    start_time,
    end_time,
    created_at: now
  }
}

// Actualiza una reserva
export async function updateReservation({ id, room_id, user_id, start_time, end_time }) {
  const now = new Date()
  await pool.query(
    'UPDATE reservations SET room_id = ?, user_id = ?, start_time = ?, end_time = ?, created_at = ? WHERE id = ?',
    [room_id, user_id, start_time, end_time, now, id]
  )

  return await findReservationById(id)
}

// Elimina una reserva por id
export async function deleteReservation(id) {
  const [result] = await pool.query(
    'DELETE FROM reservations WHERE id = ?',
    [id]
  )
  return result.affectedRows
}
