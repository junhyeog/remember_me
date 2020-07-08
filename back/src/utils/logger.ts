import winston from 'winston';
import 'winston-daily-rotate-file';

const consoleTransport = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info) => {
      const {
        timestamp, level, message, ...args
      } = info;
      const dt = new Date(timestamp);
      const formatZero = (v: number) => (v < 10 ? `0${v}` : v);
      const formatTZero = (v: number) => v < 100 ? `0${formatZero(v)}` : v;
      const ts = `${dt.getFullYear()}-${formatZero(dt.getMonth() + 1)}-${formatZero(dt.getDate())} ${formatZero(dt.getHours())}:${formatZero(dt.getMinutes())}:${formatZero(dt.getSeconds())}.${formatTZero(dt.getMilliseconds())}`;
      return `${ts} [${level}] ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    }),
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      level: 'debug',
      filename: 'log/system.log', // log 폴더에 system.log 이름으로 저장
      zippedArchive: true, // 압축여부
    }),
    new winston.transports.Console({
      level: 'debug'
    })
  ]
});

winston.clear().add(consoleTransport);
