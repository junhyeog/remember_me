import express from 'express';
import * as Controller from 'controllers/search';
import { birthVal } from 'utils/validator';
import rejectInval from 'middlewares/rejectInval';

const router = express.Router();

router.post('/main', Controller.main);

export default router;
