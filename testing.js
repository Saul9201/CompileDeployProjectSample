const fs = require('fs');
const path = require('path');

var p=path.resolve(__dirname,'imported_contracts', 'Owned.sol');
console.log(p);

var b=fs.existsSync(p);
console.log(b);
// console.log(fs.readFileSync(path.resolve(__dirname,'imported_contracts', 'Owned'),'utf8'));