import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'

import Auth from "../middleware/auth.js"

const router = Router()

router.post('/auth', UserController.auth)
router.post('/', UserController.registerUser)
router.get('/', Auth, UserController.getUsers)

export default router
