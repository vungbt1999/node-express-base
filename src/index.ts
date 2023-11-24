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
import { handleErrorApi } from '@utils/errors'
import sequelize from '@sequelize'

dotenv.config()

const app: Application = express()
const port = process.env.PORT ?? 8000

app.use(
  cors({
    credentials: true,
  }),
)

app.use(compression())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

// security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}

const server = http.createServer(app)

server.listen(port, async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    console.log(`Server is Fire at http://localhost:${port}`)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})

app.use('/api', morgan, baseMiddleware, routers, handleErrorApi)
