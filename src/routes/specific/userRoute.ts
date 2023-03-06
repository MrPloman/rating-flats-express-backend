import { usersMiddleware } from '../../middlewares/usersMiddleware'
import { AuthController } from '../../controllers/AuthController'
import express from 'express'

const router = express.Router()
const users_middleware = new usersMiddleware()
const auth_controller = new AuthController()
router.post('/register', auth_controller.registerUser)
router.post('/login', auth_controller.loginUser)
router.get('/sesion', auth_controller.getSessionStatus)
router.put('/update', auth_controller.updateUser)
router.post('/reset', auth_controller.resetPassword)
router.post('/delete', users_middleware.userPermissions, auth_controller.deleteUser)

export default router
