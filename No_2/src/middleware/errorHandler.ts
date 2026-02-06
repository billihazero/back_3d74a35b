import { Request, Response, NextFunction } from "express";

type AppError = {
  status?: number;
  httpStatus?: number;
  message?: string;
  messages?: string;
};

const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  const err = error as AppError;

  const httpStatus = err.status ?? err.httpStatus ?? 500;

  const msg =
    httpStatus === 500
      ? "Internal Server Error"
      : (err.messages ?? err.message ?? "에러 발생");

  // logger는 기존에 사용 중이라고 가정

  response.fail(msg, { httpStatus });
};

export default errorHandler;
