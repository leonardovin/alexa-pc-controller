const { exec } = require('child_process');
const logger = require('../logger');

const BluetoothService = {
  async getBluetoothDevices(callback) {
    try {
      exec('powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/listBluetooth.ps1', (error, stdout, stderr) => {
        if (error) {
          logger.error(`Error executing command: ${error.message}`);
          return;
        }
        if (stderr) {
          logger.error(`Command stderr: ${stderr}`);
          return;
        }
        logger.log(`Command stdout: ${stdout}`);
        // Parse the stdout to extract device information
        const devices = this.extractMacAddresses(stdout);
        // Invoke the callback with the array of devices
        callback(devices);
      });
    } catch (error) {
      logger.error(`Error executing command: ${error.message}`);
    }
  },
  extractMacAddresses(output) {
    const macAddressRegex = /Bluetooth#Bluetoothbc([0-9a-fA-F:]+)/g;
    const matches = output.match(macAddressRegex);

    if (!matches) {
      return [];
    }

    // Extract MAC addresses from the matches
    const macAddresses = matches.map((match) => match.split('Bluetooth#Bluetoothbc')[1]);

    return macAddresses;
  },
};

module.exports = BluetoothService;
