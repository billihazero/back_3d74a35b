import express from 'express';
import * as mealsController from '@controllers/mealsController';

const router = express.Router();

router.get('/weekly', mealsController.getWeeklyMeals);

export default router;
