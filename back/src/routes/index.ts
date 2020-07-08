import express from 'express';
import TmpRouter from './tmp';
import PatrtcRouter from './patrtc';

const router = express.Router();

// router.get('/', (_, res) => {
//   res.status(200);
//   res.send('Hello world!!');
// });

router.use('/tmp', TmpRouter);
router.use('/patrtc', PatrtcRouter);

export default router;
