// backend/src/routes/reservationsRouter.js
import express from 'express'
import {
  getAllReservations,
  getReservationById,
  createReservationHandler,
  updateReservationHandler,
  deleteReservationHandler
} from '../controllers/reservationsController.js'

const router = express.Router()

router.get('/', getAllReservations)
router.get('/:id', getReservationById)
router.post('/', createReservationHandler)
router.put('/:id', updateReservationHandler)
router.delete('/:id', deleteReservationHandler)

export default router
