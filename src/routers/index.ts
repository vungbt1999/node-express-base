import express from 'express'

import users from './users'
import posts from './posts'
import comments from './comments'
import reports from './reports'
import favorites from './favorites'
import auth from './auth'
import files from './files'
import NotFound from '@utils/errors/NotFound'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/posts', posts)
router.use('/comments', comments)
router.use('/reports', reports)
router.use('/favorites', favorites)
router.use('/files', files)
router.all('*', () => {
  throw new NotFound()
})

export default router
