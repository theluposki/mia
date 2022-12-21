import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'

import Auth from "../middleware/auth.js"

const router = Router()

router.post('/auth', UserController.auth)
router.post('/', UserController.registerUser)
router.get('/', Auth, UserController.getUsers)
router.get('/my', Auth, UserController.getMyUser)
router.post('/nickname', Auth, UserController.getAllbyNickNameLike)


export default router
