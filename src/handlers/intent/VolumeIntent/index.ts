import {exec} from 'child_process';
import {getSlotValue} from 'ask-sdk';
import logger from '../../../logger/index';
import {
  increaseVolumeCommands,
  decreaseVolumeCommands,
  commandTextMap,
  SYSTEM_VOLUME_MAX,
  DEFAULT_VOLUME,
} from './constants';

const VolumeHandler = {
  handle: (handlerInput) => {
    logger.info('Handling volume intent request');
    const command = getSlotValue(handlerInput.requestEnvelope, 'volumeCommand');
    const volumeLevel = Number(getSlotValue(handlerInput.requestEnvelope, 'amount'));
    if (volumeLevel && (volumeLevel > 100 || volumeLevel < 0)) {
      return handlerInput.responseBuilder
        .speak('O volume deve ser entre 0 e 100')
        .reprompt('O volume deve ser entre 0 e 100')
        .withSimpleCard('Volume', 'O volume deve ser entre 0 e 100')
        .getResponse();
    }

    const volumeLevelPercentage = Math.round(
      ((volumeLevel === undefined ? DEFAULT_VOLUME : SYSTEM_VOLUME_MAX) * volumeLevel) / 100,
    );

    // convert amount given in percentage to system levels, given that 100% is 65535
    let sign = '';

    if (increaseVolumeCommands.includes(command)) {
      sign = '+';
    } else if (decreaseVolumeCommands.includes(command)) {
      sign = '-';
    }

    const speechText = `O volume será ${commandTextMap[sign]} em ${volumeLevel}%`;

    exec(`nircmd.exe changesysvolume ${sign + volumeLevelPercentage}`);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Volume', speechText)
      .getResponse();
  },
};

export default VolumeHandler;
