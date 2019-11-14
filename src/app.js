// Add include root
global.reqlib = require('app-root-path').require;

// Config
const env = process.env.NODE_ENV || 'dev';
if (env === 'production') {
  global.appConfig = reqlib('/config/production.js');
} else if (env === 'dev') {
  global.appConfig = reqlib('/config/dev.js');
}



// Modules
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
// const request = require('request');

// App
const api = express();
api.use(bodyParser.json());

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = {
  definition: YAML.load('./config/swagger.yaml'),
  // Path to the API docs
  apis: ['./**/router.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
api.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add routes
const resourceRouter = require('./resourses');
api.use('/', resourceRouter);

// Start
const app = express();
app.use('/api/v1', api);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
