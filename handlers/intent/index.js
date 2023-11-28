const Alexa = require('ask-sdk');

const VolumeHandler = require('./VolumeIntent/index');
const DisplayHandler = require('./DisplayIntent/index');
const PowerHandler = require('./PowerIntent/index');

const handlers = {
  VolumeHandler,
  DisplayHandler,
  PowerHandler,
};

const IntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const handlerModule = handlers[intentName];
    return handlerModule.handle(handlerInput);
  },
};

module.exports = IntentHandler;
