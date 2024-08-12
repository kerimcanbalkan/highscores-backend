import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const API_KEY = process.env.API_KEY

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
	const apiKey = req.headers['x-api-key']
	if (apiKey && apiKey === API_KEY) {
		next()
	} else {
		res.status(403).json({ message: 'Forbidden: Invalid API Key' })
	}
}
