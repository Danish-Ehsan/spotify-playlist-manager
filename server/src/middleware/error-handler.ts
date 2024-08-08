import { Request, Response, NextFunction } from "express";

type ErrData = {
  status: number;
  message: string;
  stack?: string;
};

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Custom Error Handler firing");
  console.log(err);

  //If headers already sent then defer to the default error handler
  if (res.headersSent) {
    console.log("Deferring to default error handler");
    return next(err);
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  const errData: ErrData = {
    status: statusCode,
    message: err.message,
  };

  if (process.env.NODE_ENV === "development") {
    errData.stack = err.stack;
  }

  res.json(errData);
}
