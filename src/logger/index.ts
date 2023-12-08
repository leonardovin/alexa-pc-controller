import  { createLogger, format, transports } from 'winston'

const { combine, timestamp } = format;

const level = process.env.LOG_LEVEL || 'debug';

const logger = createLogger({
  level,
  format: combine(
    timestamp(),
    format.json(),
  ),
  defaultMeta: { service: 'alexa-pc-controller' },
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
} else {
  logger.add(new transports.Console());
}

export default logger;
