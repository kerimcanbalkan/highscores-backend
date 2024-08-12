import express from 'express'
import connectDB from './config/db'
import highscoreRoutes from './routes/highscoreRoutes'
import dotenv from 'dotenv'
import mongoSanitize from 'express-mongo-sanitize'
import { authenticate } from './middlewares/auth'

dotenv.config()

const app = express()

app.use(mongoSanitize())
app.use(express.json())
app.use(authenticate)

connectDB()

app.use('/api/highscores', highscoreRoutes)

app.use((req, res, next) => {
	res.status(404).json({ message: 'Route not found' })
	next()
})

app.get('/', (_, res) => {
	res.send('API is running')
})

export default app
