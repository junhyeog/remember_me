import { NextFunction, Request, Response } from 'express';
import winston from 'winston';

interface Err extends Error {
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export function handleError(err: Err, _: Request, res: Response, __: NextFunction) {
  winston.warn(err + '\n' + err.stack);
  const status = err.status ?? 500;
  res.status(status).json({
    success: false
  });
}