/*
 * Load config
 */
const {loadConfig} = require('./common/utils');
const config = loadConfig('./resources/config.toml');
const env = process.env.NODE_ENV || 'default';
global.appConfig = {...config['default'], ...config[env]};

/*
 * Load modules
 */
const express = require('express');
const bodyParser = require('body-parser');

/*
 * Api app
 */
const api = express();
api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());

// Add pasport
const passportConfigurator = require('./passport');
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

// Start
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
