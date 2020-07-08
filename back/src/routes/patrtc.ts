import express from 'express';
import * as Controller from 'controllers/patrtc';
import { birthVal } from 'utils/validator';
import rejectInval from 'middlewares/rejectInval';

const router = express.Router();

router.post('/birth', birthVal, rejectInval, Controller.birth);
router.get('/web', Controller.listP);
router.post('/web/birth', Controller.web_birth);

export default router;
