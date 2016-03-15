'use strict';

const EdidReader = require('../');

const edidReader = new EdidReader();

edidReader
  .loadFile(`${__dirname}/../samples/01.txt`)
  .then(() => edidReader.loadFile(`${__dirname}/../samples/02.txt`))
  .then(() => edidReader.loadFile(`${__dirname}/../samples/03.txt`))
  .then(() => edidReader.loadFile(`${__dirname}/../samples/04.txt`))
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
