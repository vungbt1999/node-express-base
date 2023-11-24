import express from 'express'

import users from './users'
import posts from './posts'

const router = express.Router()

export default (): express.Router => {
  router.use('/users', users)
  router.use('/posts', posts)

  return router
}
