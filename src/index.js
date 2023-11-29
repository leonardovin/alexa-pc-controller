const express = require('express');
const { SkillBuilders } = require('ask-sdk');
const { ExpressAdapter } = require('ask-sdk-express-adapter');

const app = express();

// Middleware function to log incoming requests
app.use((req, res, next) => {
  // log all req fields
  next();
});

const skillBuilder = SkillBuilders.custom();

// Add your request handlers here
const IntentHandler = require('./handlers/intent');
const LaunchRequestHandler = require('./handlers/launch-request');
const ErrorHandler = require('./handlers/error-handler');
const logger = require('./logger');

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
