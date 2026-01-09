// backend/src/controllers/usersController.js
import {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser
} from '../models/usersModel.js'

function validateUser({ name, email }) {
  if (!name || !name.trim()) return 'El nombre es obligatorio'
  if (!email || !email.trim() || !email.includes('@')) return 'Email inválido'
  return null
}

// GET /api/users
export async function getAllUsers(req, res) {
  try {
    const users = await findAllUsers()
    res.json({ ok: true, count: users.length, data: users })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Error interno al obtener los usuarios' })
  }
}

// GET /api/users/:id
export async function getUserById(req, res) {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'El id debe ser un número entero' })

  try {
    const user = await findUserById(id)
    if (!user) return res.status(404).json({ ok: false, error: `No existe usuario con id ${id}` })
    res.json({ ok: true, data: user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Error interno al obtener el usuario' })
  }
}

// POST /api/users
export async function createUserHandler(req, res) {
  const { name, email } = req.body
  const validationError = validateUser({ name, email })
  if (validationError) return res.status(400).json({ ok: false, error: validationError })

  try {
    const newUser = await createUser({ name: name.trim(), email: email.trim() })
    res.status(201).json({ ok: true, message: 'Usuario creado correctamente', data: newUser })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Error interno al crear el usuario' })
  }
}

// PUT /api/users/:id
export async function updateUserHandler(req, res) {
  const id = Number(req.params.id)
  const { name, email } = req.body
  if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'El id debe ser un número entero' })

  const validationError = validateUser({ name, email })
  if (validationError) return res.status(400).json({ ok: false, error: validationError })

  try {
    const existing = await findUserById(id)
    if (!existing) return res.status(404).json({ ok: false, error: `No existe usuario con id ${id}` })

    const updated = await updateUser({ id, name: name.trim(), email: email.trim() })
    res.json({ ok: true, message: 'Usuario actualizado correctamente', data: updated })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Error interno al actualizar el usuario' })
  }
}

// DELETE /api/users/:id
export async function deleteUserHandler(req, res) {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'El id debe ser un número entero' })

  try {
    const existing = await findUserById(id)
    if (!existing) return res.status(404).json({ ok: false, error: `No existe usuario con id ${id}` })

    await deleteUser(id)
    res.json({ ok: true, message: 'Usuario eliminado correctamente' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Error interno al eliminar el usuario' })
  }
}
