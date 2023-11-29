const increaseVolumeCommands = [
  'aumentar',
];

const decreaseVolumeCommands = [
  'diminuir',
];

const commandTextMap = {
  '+': 'aumentado',
  '-': 'diminuido',
};

const SYSTEM_VOLUME_MAX = 65535;
const DEFAULT_VOLUME = 6553.5;

module.exports = {
  increaseVolumeCommands,
  decreaseVolumeCommands,
  commandTextMap,
  SYSTEM_VOLUME_MAX,
  DEFAULT_VOLUME,
};
