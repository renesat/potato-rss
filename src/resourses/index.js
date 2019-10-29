const { Router } = require('express');
const { routerWrap } = reqlib('/src/common/utils')


let router = Router();
const resoursesList = [
    'sources'
];
for (i in resoursesList) {
    require('./' + resoursesList[i])(router)
}

module.exports = routerWrap(router);
