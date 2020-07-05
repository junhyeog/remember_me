import express from 'express';
import TmpRouter from './tmp';

const router = express.Router();

router.get('/', (_, res) => {
  res.status(200);
  res.send('Hello world!!');
});

router.use('/tmp', TmpRouter);

export default router;
