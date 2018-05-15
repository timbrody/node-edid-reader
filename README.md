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
  edidReader.monitors.forEach((monitor) => {
    console.log(`Vendor : ${monitor.vendor}`);
    console.log(`Model  : ${monitor.modelName}`);
    console.log(`EISA   : ${monitor.eisaId}`);
    console.log(`Code   : ${monitor.productCode}`);
    console.log(`Serial : ${monitor.serialNumber}`);
    console.log('==========================');
  });
});
```

Build
```bash
npm run build
```
