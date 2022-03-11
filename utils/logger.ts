import winston from 'winston';

const logger = winston.createLogger({
  transports: [ new winston.transports.Console({
    level: 'info',
    handleExceptions: true
  })
  ],
  exitOnError: false
});

const info = (context: Object, message: Object, scope: Object) => {
  return logger.info({ context, message, scope });
};

const error = (context: Object, message: Object, scope: Object) => {
  logger.error({ context, message, scope });
};

export default { info, error };
