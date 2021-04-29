import express from 'express';
import * as Controller from 'controllers/user';
import { birthVal } from 'utils/validator';
import rejectInval from 'middlewares/rejectInval';

const router = express.Router();

router.post('/favorite/get', Controller.favorite_get);
router.post('/favorite/add', Controller.favorite_add);
router.post('/favorite/del', Controller.favorite_del);

router.post('/log/add', Controller.log_add);

export default router;
