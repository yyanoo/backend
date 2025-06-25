import express from 'express'
import { allCard } from '../controllers/controllers.js'

const router = express.Router()

router.get('/', allCard)

export default router