'use strict';

const EdidScanner = require('../');

const edidScanner = new EdidScanner();

edidScanner
  .loadFile(`${__dirname}/../samples/01.txt`)
  .then(() => edidScanner.loadFile(`${__dirname}/../samples/02.txt`))
  .then(() => edidScanner.loadFile(`${__dirname}/../samples/03.txt`))
  .then(() => edidScanner.loadFile(`${__dirname}/../samples/04.txt`))
  .then(() => {
    console.log('==========================');
    edidScanner.monitors.forEach((monitor) => {
      console.log(`EISA :   ${monitor.edid.eisaId}`);
      console.log(`Code :   ${monitor.edid.productCode}`);
      console.log(`Serial : ${monitor.edid.serialNumber}`);
      console.log(`Model :  ${monitor.edid.modelName}`);
      console.log('==========================');
    });
  });
