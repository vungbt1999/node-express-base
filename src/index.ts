import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import http from 'http'
import compression from 'compression'
import helmet from 'helmet'
import routers from '@routers'
import morgan from '@utils/logger/morgan'
import baseMiddleware from '@middlewares/baseMiddleware'
import sequelize from '@sequelize'
import i18next from '@locale/config/i18next'
import { handleErrorApi } from '@utils/errors'
import logger from '@utils/logger'
import path from 'path'
import env from '@utils/env'

dotenv.config({ path: path.resolve(__dirname, '../.env') })
const app: Application = express()
const port = env.server.port ?? 3000

// basic
app.use(compression())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    credentials: true,
  }),
)

// security
if (env.server.env === 'production') {
  app.use(helmet())
}

// language
app.use(i18next)
app.use((req, res, next) => {
  req.i18n.changeLanguage(
    req.i18n.language.split('-').shift() ||
      process.env.LANGUAGE_DEFAULT ||
      'vi',
  )
  return next()
})

app.use('/api', morgan, baseMiddleware, routers, handleErrorApi)

const server = http.createServer(app)
server.listen(port, async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    logger.info(`[DB] ✔ Connection has been established successfully.`)
    logger.info(
      `[App] ✔ started on worker ${process.pid} http://localhost::${port}/api`,
    )
  } catch (error) {
    logger.error(`[App] ✔ Unable to connect to the database:`, error)
  }
})
