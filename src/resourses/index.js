const {Router} = require('express');

const router = new Router();
const resoursesList = [
    'sources',
    'news',
];
for (let i = 0; i < resoursesList.length; i++) {
    const subRouter = require('./' + resoursesList[i]);
    router.use('/', subRouter);
}

module.exports = router;
