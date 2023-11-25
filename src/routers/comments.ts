import { CommentControllers } from '@controllers'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/', CommentControllers.getAllComment)
router.post('/', CommentControllers.createComment)

export default router
