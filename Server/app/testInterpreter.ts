const fs = require('fs');

const dataBuffer = fs.readFileSync('./test.txt');

console.log(dataBuffer);