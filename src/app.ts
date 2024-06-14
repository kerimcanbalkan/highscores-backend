import express from 'express'
import connectDB from './config/db'
import highscoreRoutes from './routes/highscoreRoutes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

connectDB()

app.use('/api/highscores', highscoreRoutes)

app.get('/', (req, res) => {
	res.send('API is running')
})

export default app
