import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

// Define your custom formatter
const customizedFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create the logger
const logger = createLogger({
  format: combine(timestamp(), customizedFormat),

  // define the different transports
  transports: [
    new transports.File({ filename: 'log/errors.log', level: 'error' }),
    new transports.File({ filename: 'log/info.log', level: 'info' }),
    new transports.File({ filename: 'log/combined.log' }),
  ],
});

// If we're not in production then log to the `console` with the format:
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  );
}
export default logger;
