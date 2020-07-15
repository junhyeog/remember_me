import * as SearchService from 'services/search';
import { Request, Response, NextFunction } from 'express';
import { SimpleText, ResBody } from 'templates';

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
    // console.log('cont add req.body: ', JSON.stringify(req.body));
    // console.log();
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
 * @description Controller for `POST /search/add/name_kor
 */
export async function add_name_kor(req: Request, res: Response, next: NextFunction) {
  try {
    // console.log('cont add_name_kor', JSON.stringify(req.body));
    // console.log()
    const ret = await SearchService.add_option('name_kor', req.body.action.params.name_kor, req.body.contexts);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}
//! birth block
/**
 * @description Controller for `POST /search/add/birth
 */
export async function add_birth(req: Request, res: Response, next: NextFunction) {
  try {
    // console.log('Controller add_birth', JSON.stringify(req.body));
    console.log();
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
 * @description Controller for `POST /search/add/birth_year
 */
export async function add_birth_year(req: Request, res: Response, next: NextFunction) {
  try {
    // console.log('[Controller] add_birth_year', JSON.stringify(req.body));
    const ret = await SearchService.add_option('birth_year', JSON.parse(req.body.action.params.birth_year), req.body.contexts);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /search/add/birth_month
 */
export async function add_birth_month(req: Request, res: Response, next: NextFunction) {
  try {
    // console.log('[Controller] add_birth_month', JSON.stringify(req.body));
    const ret = await SearchService.add_option('birth_month', JSON.parse(req.body.action.params.birth_month), req.body.contexts);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Controller for `POST /search/add/add_birth_day
 */
export async function add_birth_day(req: Request, res: Response, next: NextFunction) {
  try {
    // console.log('[Controller] add_birth_day', JSON.stringify(req.body));
    const ret = await SearchService.add_option('birth_day', JSON.parse(req.body.action.params.birth_day), req.body.contexts);
    if (ret.success && ret.result) {
      return res.status(200).json(ret.result);
    }
    res.status(200).json(ResBody({ outputs: [SimpleText(ret.reason || 'error')] }));
  } catch (err) {
    next(err);
  }
}
