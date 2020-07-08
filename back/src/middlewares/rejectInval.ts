import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { SimpleText } from 'templates';

export default function rejectInvalid(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    console.log('invalid', JSON.stringify(req.body));
    res.status(200).json(SimpleText(JSON.stringify(errors)));
  }
}
