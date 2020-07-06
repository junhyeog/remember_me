import * as PatrtcService from 'services/patrtc';
import { Request, Response, NextFunction } from 'express';

/**
 * @description Controller for `GET /patrtc
 */
export async function listP(req: Request, res: Response, next: NextFunction) {
  try {
    const ret = await PatrtcService.listP();
    if (ret.success) {
      return res.status(200).json({
        patrtcs: ret.result!.patrtcs,
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
 * @description Controller for `POST /patrtc/birth
 */
export async function birth(req: Request, res: Response, next: NextFunction) {
  try {
    const { birth_year, birth_month, birth_day } = req.body;
    console.log(req.body);
    const ret = await PatrtcService.birth(birth_year, birth_month, birth_day);
    if (ret.success) {
      return res.status(200).json({
        patrtcs: ret.result!.patrtcs.map((p) => ({
          name_kor: p.name_kor,
          _id: p._id,
        }))
      });
    }
    res.status(400).json({
      reason: ret.reason
    });
  } catch (err) {
    next(err);
  }
}
