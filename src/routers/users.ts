import { UserControllers } from '@controllers'
import { authenticateToken } from '@middlewares/authMiddleware'
import { EUserRole } from '@types'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get(
  '/',
  authenticateToken([EUserRole.Employee]),
  UserControllers.getAllUser,
)
router.post('/', UserControllers.createUser)

export default router
