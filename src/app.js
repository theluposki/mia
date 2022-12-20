import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { InitializeDatabase } from './models/index.js'
import UserRouter from './routes/users.js'
import ProfileRouter from './routes/profiles.js'
import FriendsRouter  from './routes/friends.js'

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


InitializeDatabase()

app.use('/', express.static('src/public'))
app.use('/users', UserRouter)
app.use('/profiles', ProfileRouter)
app.use('/friends', FriendsRouter)



export default app
