import { Request, Response } from 'express'
import Highscore from '../models/highscoreModel';

export const getScores = async (_: Request, res: Response) => {
	try {
		const scores = await Highscore.find().sort({ highscore: -1 });
		res.status(200).json(scores)
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
}

export const createScore = async (req: Request, res: Response) => {
	const { username, highscore } = req.body

	try {
		let newScore = await Highscore.findOne({ username })

		if (!newScore) {
			newScore = new Highscore({ username, highscore })
			if (await scoreCheck(newScore.highscore)) {
				await newScore.save()
				return res.status(200).json(newScore)
			} else {
				return res.status(200).json({ message: "Score is not in top ten" })
			}
		} else if (highscore > newScore.highscore) {
			newScore.highscore = highscore
			const updatedScore = await Highscore.findOneAndUpdate({ username }, { highscore }, { new: true })
			res.status(200).json(updatedScore)
		} else {
			return res.status(200).json({ message: "Score is not enough to update" })
		}

	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
}

const scoreCheck = async (score: number) => {
	const topScores = await Highscore.find().sort({ highscore: 1 }).limit(10)
	const lowestScore = topScores[0]

	if (topScores.length < 10) {
		return true
	} else if (score > lowestScore.highscore) {
		await Highscore.findOneAndDelete({ username: lowestScore.username })
		return true
	}
	else {
		return false
	}
}
