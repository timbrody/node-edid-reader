# edid-reader

EDID Reader library for node

## Quick start

Install
```bash
npm install edid-reader
```

Fetching local system edid
```js
const EdidReader = require('edid-reader');
const edidReader = new EdidReader();
edidReader.scan()
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
