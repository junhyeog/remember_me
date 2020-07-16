import * as SearchService from 'services/search';
import { Request, Response, NextFunction } from 'express';
import { SimpleText, ResBody } from 'templates';
import { OptionName } from 'utils/types';

/**
 * @description Controller for `POST /search/main
 */
export async function main(req: Request, res: Response, next: NextFunction) {
  try {
    const ret = await SearchService.main();
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /search/add
 */
export async function add(req: Request, res: Response, next: NextFunction) {
  try {
    const ret = await SearchService.add(req.body.contexts);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /search/add/birth
 */
export async function add_birth(req: Request, res: Response, next: NextFunction) {
  try {
    const ret = await SearchService.add_birth(req.body.contexts);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /search/add/death
 */
export async function add_death(req: Request, res: Response, next: NextFunction) {
  try {
    const ret = await SearchService.add_death(req.body.contexts);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /search/add/add_option
 */
export async function add_option(req: Request, res: Response, next: NextFunction) {
  try {
    const option: OptionName = <OptionName>req.header('option');
    const ret = await SearchService.add_option(option, option === 'name_kor' ? req.body.action.params[option] : JSON.parse(req.body.action.params[option]), req.body.contexts);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}

//! result controllers

/**
 * @description Controller for `POST /search/result/main
 */
export async function result_main(req: Request, res: Response, next: NextFunction) {
  try {
    const ret = await SearchService.result_main(req.body.contexts, req.body.action?.clientExtra);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}
