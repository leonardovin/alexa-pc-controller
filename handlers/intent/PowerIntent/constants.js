const powerCommandMap = {
  reiniciar: 'nircmd.exe exitwin reboot',
  desligar: 'nircmd.exe exitwin poweroff',
  hibernar: 'nircmd.exe exitwin hibernate',
  suspender: 'nircmd.exe exitwin suspend',
};

const powerCommandTextMap = {
  reiniciar: 'reiniciado',
  desligar: 'desligado',
  hibernar: 'hibernado',
  suspender: 'suspenso',
};

module.exports = {
  powerCommandMap,
  powerCommandTextMap,
};
