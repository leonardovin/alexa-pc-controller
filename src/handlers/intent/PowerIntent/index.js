const Alexa = require('ask-sdk');
const childProcess = require('child_process');

const {
  powerCommandMap,
  powerCommandTextMap,
} = require('./constants');

const PowerHandler = {
  handle(handlerInput) {
    const powerCommand = Alexa.getSlotValue(handlerInput.requestEnvelope, 'powerCommand');
    const speechText = `O computador será ${powerCommandTextMap[powerCommand]}`;

    childProcess.exec(powerCommandMap[powerCommand]);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(`O computador será ${powerCommand}`, speechText)
      .getResponse();
  },
};

module.exports = PowerHandler;
