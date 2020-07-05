import express from 'express';
import * as Controller from 'controllers/tmp';

const router = express.Router();

router.get('/author', Controller.author);

export default router;
