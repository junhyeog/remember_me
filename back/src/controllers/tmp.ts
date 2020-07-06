import * as TmpService from 'services/tmp';
import { Request, Response, NextFunction } from 'express';

/**
 * @description Controller for `GET /tmp/author
 */
export async function author(req: Request, res: Response, next: NextFunction) {
  try {
    const ret = await TmpService.getAuthor();
    if (ret.success) {
      return res.status(200).json({
        author: ret.result!.author
      });
    }
    res.status(400).json({
      reason: ret.reason
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /tmp/repeat
 */
export async function repeat(req: Request, res: Response, next: NextFunction) {
  try {
    const ret = await TmpService.repeat(req.body.action.params);
    console.log(req.body);
    console.log(req.host);
    if (ret.success) {
      console.log('===========');
      console.log(ret.result);
      return res.status(200).json(ret.result);
    }
    res.status(400).json({
      reason: ret.reason
    });
  } catch (err) {
    next(err);
  }
}

