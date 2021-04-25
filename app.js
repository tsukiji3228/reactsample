const express = require('express');
const app = express();

const {router, setEndpoint} = require('./routes/router');


app.use('/', router);

module.exports.app = app;
module.exports.setEndpoint = (e) => {setEndpoint(e)};