'use strict';

const EdidScanner = require('../');

const edidScanner = new EdidScanner();
edidScanner.scan()
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
