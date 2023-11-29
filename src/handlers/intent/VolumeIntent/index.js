const childProcess = require('child_process');

const Alexa = require('ask-sdk');

const {
  increaseVolumeCommands,
  decreaseVolumeCommands,
  commandTextMap,
  SYSTEM_VOLUME_MAX,
  DEFAULT_VOLUME,
} = require('./constants');

const logger = require('../../../logger');

const VolumeHandler = {
  handle(handlerInput) {
    logger.log('Handling volume intent request');
    const command = Alexa.getSlotValue(handlerInput.requestEnvelope, 'volumeCommand');
    const volumeLevel = Alexa.getSlotValue(handlerInput.requestEnvelope, 'amount');
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

    childProcess.exec(`nircmd.exe changesysvolume ${sign + volumeLevelPercentage}`);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Volume', speechText)
      .getResponse();
  },
};

module.exports = VolumeHandler;
