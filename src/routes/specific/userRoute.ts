import { AuthController } from '../../controllers/AuthController'
import express from 'express'

const router = express.Router()

const auth_controller = new AuthController()

router.post('/', auth_controller.registerUser)
router.post('/login', auth_controller.loginUser)

export default router
