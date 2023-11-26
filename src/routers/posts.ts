import { PostControllers } from '@controllers'
import pagingMiddleware from '@middlewares/paginationMiddleware'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/', pagingMiddleware, PostControllers.getAllPost)
router.post('/', PostControllers.createPost)

export default router
