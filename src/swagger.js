const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = {
  definition: YAML.load('./config/swagger.yaml'),
  apis: ['./src/resourses/*/router.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = (api) => {
  api.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
