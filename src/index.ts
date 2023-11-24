import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import http from 'http'
import compression from 'compression'
import routers from './routers'

//For env File
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

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})

app.use('/', routers())
