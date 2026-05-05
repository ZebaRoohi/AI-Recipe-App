import express from 'express';

import * as dishController from '../controllers/dishController.js'

const router = express.Router() 

router.get('/', dishController.getDishes)


export default router