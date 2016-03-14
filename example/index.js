'use strict';

const EdidScanner = require('../');

const edidScanner = new EdidScanner();
edidScanner.scan()
  .then(() => {
    edidScanner.monitors.forEach((monitor) => {
      console.log(monitor.edid);
    });
  });
