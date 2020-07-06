import express, { Request } from 'express';
import helmet, { contentSecurityPolicy } from 'helmet';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import winston from 'winston';
import router from 'routes';
import { handleError } from 'error';
import PatrtcModel from 'models/patrtc';


async function setup(isDev: boolean) {
  if (isDev) {
    winston.info('Running in development mode');
  }
  if (process.env.MONGO_HOST === undefined) {
    winston.error('MONGO_HOST not found');
    process.exit(1);
  }
  // if (process.env.SESSION_SECRET === undefined) {
  //   winston.error('SESSION_SECRET not found');
  //   process.exit(1);
  // }
  const mongooseConfig: mongoose.ConnectionOptions = {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(process.env.MONGO_HOST, (err) => {
    if (err) {
      console.log('connection err', err);
      process.exit(1);
    }
  });
  winston.info('Connected to mongodb');
}

export default async function createApp(isDev = false) {

  // Set configs
  await setup(isDev);
  const app = express();
  app.use(helmet());
  // app.use(morgan('dev'));

  // Parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Routes
  app.use(router);

  // Error handling
  app.use(handleError);
  app.all('*', (_, res) => {
    res.status(404).json({ success: false });
  });

  return app;
}
