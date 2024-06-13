// const express = require('express');

// const app = express();

// app.get('', (req, res) => {

//     res.send("Hello Express!");
// })

// app.listen(3000, () => {

//     console.log('Server is up on port 3000.');
// })
const fs = require('fs');

const dataBuffer = fs.readFileSync('test.txt');

console.log(dataBuffer.toString());