'use strict';

// Generic imports
const Promise = require('bluebird');
const _ = require('lodash');
const os = require('os');
const fs = Promise.promisifyAll(require('fs'));
const glob = Promise.promisify(require('glob'));
const spawn = require('child_process').spawn;

// Local imports
const EdidParser = require('./edid-parser');
// const edid = new EdidParser();

class EdidReader {
  constructor() {
    if (!_.includes(['linux', 'darwin'], os.platform())) {
      process.stderr.write('EdidReader not available on this platform\n');
      return;
    }
    this.monitors = [];
  }

  getSystemEdids() {
    if (os.platform() === 'darwin') return this.getDarwinSystemEdids();
    if (os.platform() === 'linux') return this.getLinuxSystemEdids();
    throw new Error('Unsupported platform');
  }

  // Mac OSX fetch EDID
  getDarwinSystemEdids() {
    // ioreg -lw0 -r -c "IODisplayConnect" -n "display0" -d 2 | grep "IODisplayEDID" | cut -d\< -f 2 | cut -d\> -f 1
    const shellCommand = 'ioreg -lw0 -r -c "IODisplayConnect" -n "display0" -d 2 | grep "IODisplayEDID" | cut -d\\< -f 2 | cut -d\\> -f 1';
    const child = spawn('sh', ['-c', shellCommand]);
    let data = '';
    return new Promise((resolve) => {
      child.stdout.on('data', (output) => { data += output.toString(); });
      child.on('exit', () => {
        resolve(data.split('\n'));
      });
    })
    .filter((edid) => edid !== '');
  }

  // Linux fetch EDID
  getLinuxSystemEdids() {
    // /sys/devices/pci0000\:00/0000\:00\:02.0/drm/card0/card0-HDMI-A-1/edid
    return glob('/sys/devices/**/edid')
      .map((edidFileName) => fs.readFileAsync(edidFileName))
      .map((buffer) => buffer.toString('hex'))
      .filter((edid) => edid !== '');
  }

  // Group 2 by 2, hex to int
  formatEdid(edid) {
    const rawEdid = edid.split(/(?=(?:..)*$)/);
    return _.map(rawEdid, (block) => parseInt(block.toUpperCase(), 16));
  }

  // Scan host for edids
  scan() {
    return this.getSystemEdids()
      .map(this.formatEdid)
      .then((rawEdids) => {
        this.monitors = _.map(rawEdids, (rawEdid) => {
          const edidParser = new EdidParser();
          edidParser.setEdidData(rawEdid);
          edidParser.parse();
          return {
            rawEdid,
            edid: edidParser
          };
        });
      });
  }

  // Load edid file
  loadFile(path) {
    return fs.readFileAsync(path)
      .then((buffer) => {
        let rawEdid = (buffer.toString('utf8'));
        rawEdid = rawEdid.replace(/[\ \n]/g, '');
        return this.formatEdid(rawEdid);
      })
      .then((rawEdid) => {
        const edidParser = new EdidParser();
        edidParser.setEdidData(rawEdid);
        edidParser.parse();
        this.monitors.push({
          rawEdid,
          edid: edidParser
        });
        return this;
      });
  }
}

module.exports = EdidReader;


// glob('/sys')
// fs.readFile(__dirname + '/../edid', (err, result) => {
//   const rawEdidInline = result.toString('hex');
//   let rawEdid = rawEdidInline.split(/(?=(?:..)*$)/);
//   rawEdid = _.map(rawEdid, (block) => parseInt(block.toUpperCase(), 16));
//   edid.setEdidData(rawEdid);
//   edid.parse();
//   console.log(edid.validateHeader(), edid.eisaId, edid.productCode, edid.serialNumber);
// });
