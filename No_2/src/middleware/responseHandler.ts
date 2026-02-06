import { Request, Response, NextFunction } from "express";

export const responseHandler = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.ok = (
    data: any = null,
    {
      messages = "",
      total = null,
      httpStatus = 200,
    }: {
      messages?: string;
      total?: number | null;
      httpStatus?: number;
    } = {},
  ) => {
    return res.status(httpStatus).json({
      status: httpStatus,
      messages,
      data,
      total,
    });
  };

  res.fail = (
    messages: string = "",
    {
      data = null,
      total = null,
      httpStatus = 400,
    }: {
      data?: any;
      total?: number | null;
      httpStatus?: number;
    } = {},
  ) => {
    return res.status(httpStatus).json({
      status: httpStatus,
      messages,
      data,
      total,
    });
  };

  next();
};
