// backend/src/models/usersModel.js
import pool from '../config/db.js'

// Devuelve todos los usuarios
export async function findAllUsers() {
  const [rows] = await pool.query(
    'SELECT id, name, email, created_at FROM users'
  )
  return rows
}

// Devuelve un usuario por id (o null si no existe)
export async function findUserById(id) {
  const [rows] = await pool.query(
    'SELECT id, name, email, created_at FROM users WHERE id = ?',
    [id]
  )
  return rows[0] || null
}

// Crea un usuario y devuelve el nuevo registro
export async function createUser({ name, email }) {
  const now = new Date()
  const [result] = await pool.query(
    'INSERT INTO users (name, email, created_at) VALUES (?, ?, ?)',
    [name, email, now]
  )

  return {
    id: result.insertId,
    name,
    email,
    created_at: now
  }
}

// Actualiza un usuario
export async function updateUser({ id, name, email }) {
  const now = new Date()
  await pool.query(
    'UPDATE users SET name = ?, email = ?, created_at = ? WHERE id = ?',
    [name, email, now, id]
  )

  return await findUserById(id)
}

// Elimina un usuario por id
export async function deleteUser(id) {
  const [result] = await pool.query(
    'DELETE FROM users WHERE id = ?',
    [id]
  )
  return result.affectedRows
}
