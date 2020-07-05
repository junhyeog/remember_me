import * as TmpService from 'services/tmp';
import { Request, Response, NextFunction } from 'express';

/**
 * @description Controller for `GET /board/author
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
