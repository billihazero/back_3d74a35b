import { Request, Response, NextFunction } from "express";

export const getTestData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = [];
    res.ok([], {
      messages: "테스트 데이터 조회 성공",
    });
  } catch (error) {
    next(error);
  }
};
