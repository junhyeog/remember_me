import express from 'express';
import * as Controller from 'controllers/patrtc';

const router = express.Router();

router.get('/', Controller.listP);
router.post('/birth', Controller.birth);

export default router;
