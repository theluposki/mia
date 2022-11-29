import { Router } from 'express'

import { ProfileController } from '../controllers/ProfileController.js'
import Auth from "../middleware/auth.js"

const router = Router()


router.post('/:id', Auth, ProfileController.addProfile)
router.get('/', Auth, ProfileController.getAllProfiles)
router.get('/my', Auth, ProfileController.getMyProfile)


export default router
