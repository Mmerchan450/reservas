
import {
  findAllRooms,
  findRoomById,
  createRoom,
  updateRoom,
  deleteRoom
} from '../models/roomsModel.js'

function validateRoom({ name, capacity }) {
  if (typeof name !== 'string' || !name.trim()) {
    return 'El campo "name" es obligatorio'
  }
  if (typeof capacity !== 'number' || capacity <= 0) {
    return 'El campo "capacity" debe ser un número positivo'
  }
  return null
}

// GET /api/rooms
export async function getAllRooms(req, res) {
  try {
    const rooms = await findAllRooms()
    res.json({
      ok: true,
      count: rooms.length,
      data: rooms
    })
  } catch (err) {
    console.error('Error en getAllRooms:', err)
    res.status(500).json({
      ok: false,
      error: 'Error interno al obtener las salas'
    })
  }
}

// GET /api/rooms/:id
export async function getRoomById(req, res) {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      ok: false,
      error: 'El id debe ser un número entero'
    })
  }

  try {
    const room = await findRoomById(id)

    if (!room) {
      return res.status(404).json({
        ok: false,
        error: `No existe sala con id ${id}`
      })
    }

    res.json({
      ok: true,
      data: room
    })
  } catch (err) {
    console.error('Error en getRoomById:', err)
    res.status(500).json({
      ok: false,
      error: 'Error interno al obtener la sala'
    })
  }
}

// POST /api/rooms
export async function createRoomHandler(req, res) {
  const { name, capacity } = req.body

  const validationError = validateRoom({ name, capacity })
  if (validationError) {
    return res.status(400).json({
      ok: false,
      error: validationError
    })
  }

  try {
    const newRoom = await createRoom({ name: name.trim(), capacity })
    res.status(201).json({
      ok: true,
      message: 'Sala creada correctamente',
      data: newRoom
    })
  } catch (err) {
    console.error('Error en createRoomHandler:', err)
    res.status(500).json({
      ok: false,
      error: 'Error interno al crear la sala'
    })
  }
}

// PUT /api/rooms/:id
export async function updateRoomHandler(req, res) {
  const id = Number(req.params.id)
  const { name, capacity } = req.body

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      ok: false,
      error: 'El id debe ser un número entero'
    })
  }

  const validationError = validateRoom({ name, capacity })
  if (validationError) {
    return res.status(400).json({
      ok: false,
      error: validationError
    })
  }

  try {
    const existing = await findRoomById(id)
    if (!existing) {
      return res.status(404).json({
        ok: false,
        error: `No existe sala con id ${id}`
      })
    }

    const updated = await updateRoom({ id, name: name.trim(), capacity })

    res.json({
      ok: true,
      message: 'Sala actualizada correctamente',
      data: updated
    })
  } catch (err) {
    console.error('Error en updateRoomHandler:', err)
    res.status(500).json({
      ok: false,
      error: 'Error interno al actualizar la sala'
    })
  }
}

// DELETE /api/rooms/:id
export async function deleteRoomHandler(req, res) {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      ok: false,
      error: 'El id debe ser un número entero'
    })
  }

  try {
    const existing = await findRoomById(id)
    if (!existing) {
      return res.status(404).json({
        ok: false,
        error: `No existe sala con id ${id}`
      })
    }

    await deleteRoom(id)
    res.json({
      ok: true,
      message: 'Sala eliminada correctamente'
    })
  } catch (err) {
    console.error('Error en deleteRoomHandler:', err)
    res.status(500).json({
      ok: false,
      error: 'Error interno al eliminar la sala'
    })
  }
}