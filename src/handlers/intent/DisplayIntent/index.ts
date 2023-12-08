import {getSlotValue} from 'ask-sdk';
import { exec } from 'child_process';
import { displayTextMap, displayCommandMap } from './constants';

const DisplayHandler = {
  handle(handlerInput) {
    const displayCommand = getSlotValue(handlerInput.requestEnvelope, 'command');
    const speechText = `O display será ${displayTextMap[displayCommand]}`;

    exec(displayCommandMap[displayCommand]);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(`O display será ${displayTextMap[displayCommand]}`, speechText)
      .getResponse();
  },
};

export default DisplayHandler;
