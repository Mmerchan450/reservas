// backend/routes/roomsRouter.js
import express from 'express'
import {
  getAllRooms,
  getRoomById,
  createRoomHandler,
  updateRoomHandler,
  deleteRoomHandler
} from '../controllers/roomsController.js'

const router = express.Router()

router.get('/', getAllRooms)
router.get('/:id', getRoomById)
router.post('/', createRoomHandler)
router.put('/:id', updateRoomHandler)
router.delete('/:id', deleteRoomHandler)

export default router
