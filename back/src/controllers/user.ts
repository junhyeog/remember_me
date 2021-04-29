import * as UserService from 'services/user';
import { Request, Response, NextFunction } from 'express';
import { SimpleText, ResBody } from 'templates';

/**
 * @description Controller for `POST /user/favorite/get
 */
export async function favorite_get(req: Request, res: Response, next: NextFunction) {
  try {
    const ret = await UserService.favorite_get(req.body.userRequest.user.id, req.body.action?.clientExtra);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    return res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /user/favorite/add
 */
export async function favorite_add(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const ret = await UserService.favorite_add(body.userRequest.user.id, body.action.clientExtra._id);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    return res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /user/favorite/del
 */
export async function favorite_del(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const ret = await UserService.favorite_del(body.userRequest.user.id, body.action.clientExtra._id);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    return res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /user/log/add
 */
export async function log_add(req: Request, res: Response, next: NextFunction) {
  try {
    const ret = await UserService.log_add(req.body.userRequest.user.id, req.body);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    return res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}
