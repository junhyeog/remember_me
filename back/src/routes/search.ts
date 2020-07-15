import express from 'express';
import * as Controller from 'controllers/search';
import { birthVal } from 'utils/validator';
import rejectInval from 'middlewares/rejectInval';

const router = express.Router();

router.post('/main', Controller.main);
router.post('/add', Controller.add);
router.post('/add/birth', Controller.add_birth);
router.post('/add/option', Controller.add_option);
// router.post('/add/name_kor', Controller.add_name_kor);
// router.post('/add/birth_year', Controller.add_birth_year);
// router.post('/add/birth_month', Controller.add_birth_month);
// router.post('/add/birth_day', Controller.add_birth_day);

export default router;
