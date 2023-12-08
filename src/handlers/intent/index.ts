import {getRequestType, getIntentName} from 'ask-sdk';
import VolumeHandler from './VolumeIntent/index';
import DisplayHandler from './DisplayIntent/index';
import PowerHandler from './PowerIntent/index';
import logger from '../../logger';

const handlers = {
  VolumeIntent: VolumeHandler,
  DisplayIntent: DisplayHandler,
  PowerIntent: PowerHandler,
};

const IntentHandler = {
  canHandle: (handlerInput) => getRequestType(handlerInput.requestEnvelope) === 'IntentRequest',
  handle: (handlerInput) => {
    logger.info('IntentHandler');
    const intentName = getIntentName(handlerInput.requestEnvelope);
    logger.info('received intent: ', intentName);
    const handlerModule = handlers[intentName];
    return handlerModule.handle(handlerInput);
  },
};

export default IntentHandler;
