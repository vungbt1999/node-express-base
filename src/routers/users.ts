import { UserControllers } from '@controllers'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/', UserControllers.getAllUser)
router.post('/', UserControllers.createUser)

export default router
