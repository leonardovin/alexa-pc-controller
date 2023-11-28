const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Bem vindo ao controlador de computador. Me diga o que você quer fazer.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Bem vindo ao controlador de computador. Me diga o que você quer fazer.', speechText)
      .getResponse();
  },
};

module.exports = LaunchRequestHandler;
