import express from 'express';
import { getRecipesDetails } from '../controllers/recipeController.js';    
const router = express.Router();

router.get('/:dishName', getRecipesDetails);    

export default router;