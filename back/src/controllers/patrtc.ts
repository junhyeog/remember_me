import * as PatrtcService from 'services/patrtc';
import { Request, Response, NextFunction } from 'express';
import { SimpleText } from 'templates';

/**
 * @description Controller for `POST /patrtc/birth
 */
export async function birth(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(JSON.stringify(req.body));
    console.log();
    const ret = await PatrtcService.birth(req.body.action.params.birth, req.body.action?.clientExtra);

    console.log('cont ret test : ', JSON.stringify(ret.result));
    console.log();
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(SimpleText(ret.reason || 'error'));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /patrtc/birth/sub
 */
export async function birth_sub(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(JSON.stringify(req.body));
    console.log();
    const ret = await PatrtcService.birth_sub(req.body.action?.clientExtra);

    console.log('cont ret test : ', JSON.stringify(ret.result));
    console.log();
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(SimpleText(ret.reason || 'error'));
  } catch (err) {
    next(err);
  }
}