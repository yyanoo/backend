import express from 'express'
import { cards } from '../controllers/controllers_card.js'

const router = express.Router()

router.get('/cards', cards)

export default router