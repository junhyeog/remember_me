import dotenv from 'dotenv';
dotenv.config();
import './src/utils/logger';
import createApp from './src';
import http from 'http';
import https from 'https';
import fs from 'fs';
import winston from 'winston';

function buildServer(isHttps: string|undefined) {
  if (isHttps==='1') {
    const option = {
      ca: fs.readFileSync('/etc/letsencrypt/live/antemrdm.com/fullchain.pem'),
      key: fs.readFileSync('/etc/letsencrypt/live/antemrdm.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/antemrdm.com/cert.pem'),
    };
    try {
      createApp(process.env.NODE_ENV === 'development').then((app) => {
        winston.info(`[+] Starting https server on port ${process.env.PORT}....`);
        https.createServer(option, app).listen(process.env.PORT, () => {
          winston.info(
            `[+] Now https server on port ${process.env.PORT} is listening`
          );
        });
      });
    } catch (error) {
      winston.error('[-] Fail to start https server: ', error);
    }
  }
  else{
    try{
      createApp(process.env.NODE_ENV === 'development').then((app) => {
        winston.info(`[+] Starting http server on port ${process.env.PORT}....`);
        const httpServer = http.createServer(app);
        httpServer.listen(process.env.PORT, () => {
          winston.info(
            `[+] Now http server on port ${process.env.PORT} is listening`
          );
        });
      });
    } catch(error){
      winston.error('[-] Fail to start http server: ', error);
    }
  }
}

buildServer(process.env.USE_HTTPS);
