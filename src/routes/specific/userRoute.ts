import { AuthController } from '../../controllers/AuthController'
import express from 'express'

const router = express.Router()

const auth_controller = new AuthController()
router.post('/register', auth_controller.registerUser)
router.post('/login', auth_controller.loginUser)
router.get('/sesion', auth_controller.getSessionStatus)
router.put('/update', auth_controller.updateUser)

export default router
