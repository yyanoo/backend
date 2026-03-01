import express from 'express'
import { allCard } from '../controllers/controllers.js'

const router = express.Router()

router.get('/cards', allCard)

export default router