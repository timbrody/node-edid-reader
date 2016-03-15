'use strict';

const EdidReader = require('../');

const edidReader = new EdidReader();
edidReader.scan()
  .then(() => {
    console.log('==========================');
    edidReader.monitors.forEach((monitor) => {
      console.log(`EISA :   ${monitor.edid.eisaId}`);
      console.log(`Code :   ${monitor.edid.productCode}`);
      console.log(`Serial : ${monitor.edid.serialNumber}`);
      console.log(`Model :  ${monitor.edid.modelName}`);
      console.log('==========================');
    });
  });
