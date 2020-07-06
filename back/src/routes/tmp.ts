import express from 'express';
import * as Controller from 'controllers/tmp';

const router = express.Router();

router.get('/author', Controller.author);
router.post('/repeat', Controller.repeat);

export default router;
