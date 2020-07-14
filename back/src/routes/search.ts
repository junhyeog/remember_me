import express from 'express';
import * as Controller from 'controllers/search';
import { birthVal } from 'utils/validator';
import rejectInval from 'middlewares/rejectInval';

const router = express.Router();

router.post('/main', Controller.main);
router.post('/add', Controller.add);
router.post('/add/name_kor', Controller.add_name_kor);

export default router;
