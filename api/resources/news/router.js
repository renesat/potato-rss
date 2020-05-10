const {Router}= require('express');
const service = require('./service');

const getNewsList = async (req, res, next) => {
    await service.getNewsList(
        req.user
    ).then(result => {
        res.status(result.status).json(result.data);
    }).catch(err => {
        next(err);
    });
};

const getNews = async (req, res, next) => {
    await service.getNews(
        res.params.news_id
    ).then(result => {
        res.status(result.status).json(result.data);
    }).catch(err => {
        next(err);
    });
};

const changeNews = async (req, res, next) => {
    // TODO
    await service.changeNews(
        res.params.idNews
    ).then(result => {
        res.status(result.status).json(result.data);
    }).catch(err => {
        next(err);
    });
};

// const deleteNews = async (req, res) => {
//     await service.deleteNews(res.params.idNews); // TODO
//     res.status(200).send('');
// };

const notExistError = async (req, res) => {
    res.status(405).send();
};

const router = new Router();
router.get('/news', getNewsList);
router.all('/news', notExistError);

router.get('/news/:idNews', getNews);
router.patch('/news/:idNews', changeNews);
// router.delete('/news/:idNews', deleteNews);
router.all('/news/:idNews', notExistError);

module.exports = router;
