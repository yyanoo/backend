import express from 'express'
import { allCard } from '../controllers/controllers.js'

const router = express.Router()

router.post('/cards', allCard)

export default router