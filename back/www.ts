import dotenv from 'dotenv';
dotenv.config();
import './src/utils/logger';
import createApp from './src';
import http from 'http';
import https from 'https';
import fs from 'fs';
import winston from 'winston';

//? http server
// createApp(process.env.NODE_ENV === 'development').then((app) => {
//   const httpServer = http.createServer(app);
//   httpServer.listen(process.env.PORT);
// });

//? https server
const option = {
  ca: fs.readFileSync('/etc/letsencrypt/live/antemrdm.com/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/antemrdm.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/antemrdm.com/cert.pem'),
};

try{
createApp(process.env.NODE_ENV === 'development').then((app) => {
      winston.info(`starting https server on port ${process.env.PORT}....`);
      https.createServer(option,app).listen(process.env.PORT, ()=>{
      winston.info(`now https server on port ${process.env.PORT} is listening`);
    });
  });
} catch (error) {
  winston.error('fail to start https server', error);
}
