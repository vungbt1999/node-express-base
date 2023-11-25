import { ReportControllers } from '@controllers'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/', ReportControllers.getAllReport)
router.post('/', ReportControllers.createReport)

export default router
