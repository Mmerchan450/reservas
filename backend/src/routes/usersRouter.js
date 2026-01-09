// backend/src/routes/usersRouter.js
import express from 'express'
import {
  getAllUsers,
  getUserById,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
} from '../controllers/usersController.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUserHandler)
router.put('/:id', updateUserHandler)
router.delete('/:id', deleteUserHandler)

export default router
