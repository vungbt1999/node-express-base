import { FavoriteControllers } from '@controllers'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/', FavoriteControllers.getAllFavorite)
router.post('/', FavoriteControllers.createFavorite)

export default router
