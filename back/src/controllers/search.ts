import * as SearchService from 'services/search';
import { Request, Response, NextFunction } from 'express';
import { SimpleText } from 'templates';

/**
 * @description Controller for `POST /search/main
 */
export async function main(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('cont main', JSON.stringify(req.body));
    const ret = await SearchService.main();
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(SimpleText(ret.reason || 'error'));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /search/add
 */
export async function add(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('cont add', JSON.stringify(req.body));
    const ret = await SearchService.add(req.body.contexts);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(SimpleText(ret.reason || 'error'));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /search/add/name_kor
 */
export async function add_name_kor(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('cont add name_kor', JSON.stringify(req.body));
    const ret = await SearchService.add_name_kor(req.body.action.params.name_kor, req.body.contexts);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(SimpleText(ret.reason || 'error'));
  } catch (err) {
    next(err);
  }
}
