const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = {
    definition: YAML.load('./resources/swagger.yaml'),
    apis: ['./server/resourses/*/router.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = (api) => {
    api.use('/$', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
