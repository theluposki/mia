import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { InitializeDatabase } from './models/index.js'
import UserRouter from './routes/user.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use(morgan('tiny'))

InitializeDatabase()

app.use('/user', UserRouter)

app.get('/', (req,res) => {
  res.status(200).json({ messagem: "OK"})
})

export default app
