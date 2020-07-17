import express from 'express';
import * as Controller from 'controllers/main';
import { birthVal } from 'utils/validator';
import rejectInval from 'middlewares/rejectInval';

const router = express.Router();

router.post('/home', Controller.home);
router.post('/info', Controller.info);
router.post('/today', Controller.today);

export default router;
