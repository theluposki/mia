import { Router } from 'express'

import { FriendsController } from '../controllers/FriendsController.js'
import Auth from "../middleware/auth.js"

const router = Router()


router.post('/', Auth, FriendsController.addFriend)
router.get('/', Auth, FriendsController.getAllFriends)


export default router
