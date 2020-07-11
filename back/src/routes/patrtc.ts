import express from 'express';
import * as Controller from 'controllers/patrtc';
import { birthVal } from 'utils/validator';
import rejectInval from 'middlewares/rejectInval';

const router = express.Router();

router.post('/birth', birthVal, rejectInval, Controller.birth);

export default router;
