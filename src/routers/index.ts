import express from 'express'

import users from './users'
import posts from './posts'
import NotFound from '@utils/errors/NotFound'

const router = express.Router()

router.use('/users', users)
router.use('/posts', posts)
router.all('*', () => {
  throw new NotFound()
})

export default router
