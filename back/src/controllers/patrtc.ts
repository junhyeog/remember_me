import * as PatrtcService from 'services/patrtc';
import { Request, Response, NextFunction } from 'express';
import { SimpleText } from 'templates';

/**
 * @description Controller for `POST /patrtc/birth
 */
export async function birth(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(JSON.stringify(req.body));
    // console.log(req);
    const ret = await PatrtcService.birth(req.body.action.params.birth);
    if (ret.success && ret.result) {
      return res.status(200).json(SimpleText(ret.result));
    }
    res.status(200).json(SimpleText(ret.reason || 'error'));
  } catch (err) {
    next(err);
  }
}
