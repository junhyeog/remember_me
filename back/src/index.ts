import express, { Request } from 'express';
import helmet, { contentSecurityPolicy } from 'helmet';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import winston from 'winston';
import router from 'routes';
import handleError from 'middlewares/handelError';
import PatrtcModel from 'models/patrtc';


async function setup(isDev: boolean) {
  if (isDev) {
    winston.info('Running in development mode');
  }
  else {
    winston.info('Running in prod mode');
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
  await mongoose.connect(process.env.MONGO_HOST, mongooseConfig, (err) => {
    if (err) {
      winston.error('connection err', err);
      process.exit(1);
    }
  });
  winston.info('Connected to mongodb');
}

export default async function createApp(isDev = false) {

  // Set configs
  await setup(isDev);
  const app = express();
  app.set('views', './src/views');
  app.set('view engine', 'ejs');
  app.use('/img', express.static(__dirname + '/public'));
  app.use(helmet());
  // app.use(morgan('dev'));

  // Set cors
  app.use(cors());

  // Parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Routes
  // app.use(router);
  app.use('/', router);


  // Error handling
  app.use(handleError);
  app.all('*', (_, res) => {
    res.status(404).json({ success: false });
  });

  return app;
}
