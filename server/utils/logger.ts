import { createLogger, format, transports } from 'winston';

// Define your custom formatter
const customizedFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create the logger
const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), customizedFormat),

  transports: [
    new transports.File({
      filename: 'log/errors.log',
    }),
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
