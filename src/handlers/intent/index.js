const Alexa = require('ask-sdk');

const VolumeHandler = require('./VolumeIntent/index');
const DisplayHandler = require('./DisplayIntent/index');
const PowerHandler = require('./PowerIntent/index');
const logger = require('../../logger');

const handlers = {
  VolumeIntent: VolumeHandler,
  DisplayIntent: DisplayHandler,
  PowerIntent: PowerHandler,
};

const IntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
  },
  handle(handlerInput) {
    logger.info('IntentHandler');
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    logger.info('received intent: ', intentName);
    const handlerModule = handlers[intentName];
    return handlerModule.handle(handlerInput);
  },
};

module.exports = IntentHandler;
