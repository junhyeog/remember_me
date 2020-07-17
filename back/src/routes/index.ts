import express from 'express';
import TmpRouter from './tmp';
import PatrtcRouter from './patrtc';
import SearchRouter from './search';
import MainRouter from './main';
import UserRouter from './user';

const router = express.Router();


router.use('/tmp', TmpRouter);
router.use('/patrtc', PatrtcRouter);
router.use('/search', SearchRouter);
router.use('/main', MainRouter);
router.use('/user', UserRouter);

router.get('/', (_, res) => {
  res.status(200);
  res.send('Hello world!!');
});

export default router;
