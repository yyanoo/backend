import express from 'express'
import { getCardById } from '../controllers/controllers.js'

const router = express.Router()

router.get('/:id', getCardById)

export default router