import express from 'express';
import TmpRouter from './tmp';
import PatrtcRouter from './patrtc';
import SearchRouter from './search';

const router = express.Router();


router.use('/tmp', TmpRouter);
router.use('/patrtc', PatrtcRouter);
router.use('/search', SearchRouter);

router.get('/', (_, res) => {
  res.status(200);
  res.send('Hello world!!');
});

export default router;
