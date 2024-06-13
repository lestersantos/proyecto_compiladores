import express = require('express');
//var parser = require('../src/Analyzer/grammar').parser;

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({limit: "50mb"}));

app.use("/api",require("./routes/routes"));

app.listen(3000, () => {

    console.log('Server is up on port 3000.');
})