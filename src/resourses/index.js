const {Router} = require('express');
const {routerWrap} = reqlib('/src/common/utils');


const router = new Router();
const resoursesList = [
  'sources',
];
for (let i = 0; i < resoursesList.length; i++) {
  router.use('/', router);
}

module.exports = router;
