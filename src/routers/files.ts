import { FavoriteControllers, FileControllers } from '@controllers'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/sign-upload-url', FileControllers.getSignUrlUpload)

export default router
