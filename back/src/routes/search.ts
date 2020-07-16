import express from 'express';
import * as Controller from 'controllers/search';
import { birthVal } from 'utils/validator';
import rejectInval from 'middlewares/rejectInval';

const router = express.Router();

router.post('/main', Controller.main);
router.post('/add', Controller.add);
router.post('/add/birth', Controller.add_birth);
router.post('/add/death', Controller.add_death);
router.post('/add/option', Controller.add_option);
router.post('/result/main', Controller.result_main);

export default router;
