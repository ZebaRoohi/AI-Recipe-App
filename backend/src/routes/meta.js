import express from 'express'
import { getStates } from '../controllers/stateController.js'
import { getCategories } from '../controllers/categoryController.js'

const router = express.Router()

router.get('/states', getStates)
router.get('/categories', getCategories)

export default router