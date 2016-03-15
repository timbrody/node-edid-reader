'use strict';

const EdidReader = require('../');

const edidReader = new EdidReader();
edidReader.scan()
  .then(() => {
    console.log('==========================');
    edidReader.monitors.forEach((monitor) => {
      console.log(`EISA :   ${monitor.eisaId}`);
      console.log(`Manuf. : ${monitor.manufacturer}`);
      console.log(`Code :   ${monitor.productCode}`);
      console.log(`Serial : ${monitor.serialNumber}`);
      console.log(`Model :  ${monitor.modelName}`);
      console.log('==========================');
    });
  });
