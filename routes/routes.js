import express from 'express'
import { getCardById } from '../controllers/controllers.js'
import { allCard } from '../controllers/controllers.js'

const router = express.Router()

router.get('/:id', getCardById)
router.get('/', allCard)

export default router