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

module.exports = {
  increaseVolumeCommands,
  decreaseVolumeCommands,
  commandTextMap,
  SYSTEM_VOLUME_MAX,
};
