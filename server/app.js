/*
 * Require whith root
 */
global.reqlib = require('app-root-path').require;

/*
 * Load config
 */
const env = process.env.NODE_ENV || 'dev';
if (env === 'production') {
    global.appConfig = reqlib('/config/production.js');
} else if (env === 'dev') {
    global.appConfig = reqlib('/config/dev.js');
}

/*
 * Load modules
 */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

/*
 * Api app
 */
const api = express();
api.use(session({secret: 'cats'}));
api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());

// Add pasport
const passportConfigurator = require('./swagger');
passportConfigurator(api);

// Add swagger
const swaggerUIConfigurator = require('./swagger');
swaggerUIConfigurator(api);

// Add routes
const resourceRouter = require('./resourses');
api.use('/', resourceRouter);

/*
 * Start application
 */
const app = express();
app.use('/api/v1', api);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
