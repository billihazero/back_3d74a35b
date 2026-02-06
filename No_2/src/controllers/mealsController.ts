import { Request, Response, NextFunction } from 'express';
import { getTodayYmdKst } from '@utils/day';
import * as mealsService from '@services/mealsService';

export type WeeklyMealsQuery = {
  from?: string;
};

export const getWeeklyMeals = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { from } = req.query as WeeklyMealsQuery;

    const safeFrom = from ?? getTodayYmdKst();
    const result = await mealsService.getWeeklyMeals(safeFrom);
    return res.ok(result, {
      messages: `${from} 식사 정보 조회 성공했습니다.`,
      total: result.length,
    });
  } catch (error) {
    next(error);
  }
};
