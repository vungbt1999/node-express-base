import express, { Router } from 'express'
import { UserControllers } from '../controllers'

const router: Router = express.Router()

router.get('/', UserControllers.getAllUsers)
router.delete('/:id', UserControllers.deleteUser)
router.put('/:id', UserControllers.deleteUser)

export default router
