import { PostControllers } from '@controllers'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/', PostControllers.getAllPost)
router.post('/', PostControllers.createPost)

export default router
