import * as MainService from 'services/main';
import { Request, Response, NextFunction } from 'express';
import { SimpleText, ResBody } from 'templates';

/**
 * @description Controller for `POST /main/home
 */
export async function home(req: Request, res: Response, next: NextFunction) {
  try {
    const ret = await MainService.home();
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    return res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /main/today
 */
export async function today(req: Request, res: Response, next: NextFunction) {
  try {
    const ret = await MainService.today(req.body.action?.clientExtra);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    return res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /main/info
 */
export async function info(req: Request, res: Response, next: NextFunction) {
  try {
    const ret = await MainService.info();
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    return res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}


