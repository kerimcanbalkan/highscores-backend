import { Request, Response } from 'express'
import Highscore from '../models/highscoreModel';

export const getScores = async (req: Request, res: Response) => {
	try {
		const scores = await Highscore.find();
		res.status(200).json(scores)
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
}

export const createScore = async (req: Request, res: Response) => {
	const { username, highscore } = req.body

	try {
		const newHighscore = new Highscore({ username, highscore })
		await newHighscore.save()
		res.status(201).json(newHighscore)
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
}

export const updateScore = async (req: Request, res: Response) => {
	const { username, highscore } = req.body
	try {
		const updatedScore = await Highscore.findOneAndUpdate({ username }, { highscore }, { new: true })
		if (!updatedScore) {
			return res.status(404).json({ message: "Username not found" })
		}
		res.status(200).json(updatedScore)

	} catch (error) {
		res.status(500).json({ message: 'Server Error' })
	}
}
