const { routerWrap } = reqlib('/src/common/utils')
const router = require('./router');

module.exports = routerWrap(router);
