import {getSlotValue} from 'ask-sdk';
import {exec} from 'child_process';
import {
  powerCommandMap,
  powerCommandTextMap,
} from './constants';

const PowerHandler = {
  handle: (handlerInput) => {
    const powerCommand = getSlotValue(handlerInput.requestEnvelope, 'powerCommand');
    const speechText = `O computador será ${powerCommandTextMap[powerCommand]}`;

    exec(powerCommandMap[powerCommand]);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(`O computador será ${powerCommand}`, speechText)
      .getResponse();
  },
};

export default PowerHandler;
