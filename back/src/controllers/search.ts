import * as SearchService from 'services/search';
import { Request, Response, NextFunction } from 'express';
import { SimpleText } from 'templates';

/**
 * @description Controller for `POST /search/main
 */
export async function main(req: Request, res: Response, next: NextFunction) {
  try {
    // console.log('cont main', JSON.stringify(req.body));
    const ret = await SearchService.main();
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(SimpleText(ret.reason || 'error'));
  } catch (err) {
    next(err);
  }
}
