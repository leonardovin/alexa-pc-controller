import {getRequestType, getDeviceId} from 'ask-sdk';
import BluetoothService from '../services/BluetoothService';
import logger from '../logger';

const LaunchRequestHandler = {
  canHandle: (handlerInput) => getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest',
  handle: async (handlerInput) => {
    const speechText = 'Bem vindo ao controlador de computador. Me diga o que você quer fazer.';

    // use the bluetooth service class to list the paired devices

    logger.info('Getting devices');
    const devices = await BluetoothService.getBluetoothDevices(
      (device) => logger.info('Device found: ', device),
    );
    logger.info('Devices: ', devices);

    // Get alexa device mac address
    const deviceId = getDeviceId(handlerInput.requestEnvelope);
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

export default LaunchRequestHandler;
