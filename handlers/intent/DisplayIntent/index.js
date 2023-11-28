const Alexa = require('ask-sdk');
const childProcess = require('child_process');

const {
  displayTextMap,
  displayCommandMap,
} = require('./constants');

const DisplayHandler = {
  handle(handlerInput) {
    const displayCommand = Alexa.getSlotValue(handlerInput.requestEnvelope, 'command');
    const speechText = `O display será ${displayTextMap[displayCommand]}`;

    childProcess.exec(displayCommandMap[displayCommand]);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(`O display será ${displayTextMap[displayCommand]}`, speechText)
      .getResponse();
  },
};

module.exports = DisplayHandler;
