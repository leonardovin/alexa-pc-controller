const Alexa = require('ask-sdk');
const BluetoothService = require('../services/BluetoothService');
const logger = require('../logger');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Bem vindo ao controlador de computador. Me diga o que você quer fazer.';

    // use the bluetooth service class to list the paired devices

    logger.info('Getting devices');
    BluetoothService.getBluetoothDevices((devices) => {
      logger.info('Devices: ', devices);
    });

    // Get alexa device mac address
    const deviceId = Alexa.getDeviceId(handlerInput.requestEnvelope);
    console.log('Device ID: ', deviceId);
    if (deviceId) {
      logger.info('Device ID: ', deviceId);
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Bem vindo ao controlador de computador. Me diga o que você quer fazer.', speechText)
      .getResponse();
  },
};

module.exports = LaunchRequestHandler;
