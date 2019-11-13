// Add include root
global.reqlib = require('app-root-path').require;

// Config
var env = process.env.NODE_ENV || 'dev';
if (env === 'production') {
    global.appConfig = reqlib('/config/production.js');
} else if (env === 'dev') {
    global.appConfig = reqlib('/config/dev.js');
}



// Modules
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
// App
const api = express();
api.use(bodyParser.json());

// Add routes
const resourceRouter = require('./resourses');
resourceRouter(api);

// Start
const app = express();
app.use('/api/v1', api);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Example app listening on port ${port}!'));
