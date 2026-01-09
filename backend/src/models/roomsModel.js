// src/models/roomModel.js
import pool from '../config/db.js'

// Devuelve todas las salas
export async function findAllRooms() {
  const [rows] = await pool.query(
    'SELECT id, name, capacity, created_at FROM rooms'
  )
  return rows
}

// Devuelve una sala por id (o null si no existe)
export async function findRoomById(id) {
  const [rows] = await pool.query(
    'SELECT id, name, capacity, created_at FROM rooms WHERE id = ?',
    [id]
  )
  return rows[0] || null
}

// Crea una sala y devuelve el nuevo registro
export async function createRoom({ name, capacity }) {
  const now = new Date()

  const [result] = await pool.query(
    'INSERT INTO rooms (name, capacity, created_at) VALUES (?, ?, ?)',
    [name, capacity, now]
  )

  return {
    id: result.insertId,
    name,
    capacity,
    created_at: now
  }
}

// Actualiza una sala (PUT completo)
export async function updateRoom({ id, name, capacity }) {
  const now = new Date()

  await pool.query(
    'UPDATE rooms SET name = ?, capacity = ?, created_at = ? WHERE id = ?',
    [name, capacity, now, id]
  )

  // Devolvemos el estado final desde la BD
  return await findRoomById(id)
}

// Elimina una sala por id
export async function deleteRoom(id) {
  const [result] = await pool.query(
    'DELETE FROM rooms WHERE id = ?',
    [id]
  )
  return result.affectedRows // 0 si no existía, 1 si se borró
}
