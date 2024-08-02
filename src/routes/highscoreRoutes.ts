import { Router } from 'express'
import { getScores, createScore, updateScore } from '../controllers/highscoreController'

const router = Router();

router.get('/', getScores)
router.post('/', createScore)
router.put('/', updateScore)

export default router
