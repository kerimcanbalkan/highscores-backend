import { Router } from 'express'
import { getScores, createScore } from '../controllers/highscoreController'

const router = Router();

router.get('/', getScores)
router.post('/', createScore)

export default router
