import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'

const router = Router()

router.post('/auth', UserController.auth)
router.post('/', UserController.registerUser)
router.get('/', UserController.getUsers)

export default router
