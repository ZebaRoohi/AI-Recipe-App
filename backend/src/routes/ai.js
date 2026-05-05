import express from 'express'
import { getAIDishes } from '../controllers/aiController.js'

const router = express.Router()

router.post('/dishes', getAIDishes)

export default router