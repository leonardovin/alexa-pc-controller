const express = require('express');
const { SkillBuilders } = require('ask-sdk');
const { ExpressAdapter } = require('ask-sdk-express-adapter');
const IntentHandler = require('./handlers/intent');
const LaunchRequestHandler = require('./handlers/launch-request');
const ErrorHandler = require('./handlers/error-handler');
const logger = require('./logger');

const app = express();

// Middleware function to log incoming requests
app.use((req, res, next) => {
  logger.info('Incoming request');
  next();
});

const skillBuilder = SkillBuilders.custom();

skillBuilder.addRequestHandlers(
  LaunchRequestHandler,
  IntentHandler,
  ErrorHandler,
);

const adapter = new ExpressAdapter(skillBuilder.create(), false, false);

app.post('/', adapter.getRequestHandlers());

app.listen(3000, () => {
  logger.info('Server is running on port 3000');
});
