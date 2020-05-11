const {Router}= require('express');
const service = require('./service');
const passport = require('passport');

const getNewsList = async (req, res, next) => {
    await service.getNewsList(
        req.params.sourceID
    ).then(result => {
        res.status(result.status).json(result.data);
    }).catch(err => {
        next(err);
    });
};

const getNews = async (req, res, next) => {
    await service.getNews(
        req.params.newsID
    ).then(result => {
        res.status(result.status).json(result.data);
    }).catch(err => {
        next(err);
    });
};

const swapFavourite = async (req, res, next) => {
    await service.swapFavourite(
        req.params.newsID
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
router.get(
    '/sources/:sourceID/news',
    passport.authenticate('bearer', { session: false }),
    getNewsList
);
router.all(
    '/sources/:sourceID/news',
    passport.authenticate('bearer', { session: false }),
    notExistError
);

router.get(
    '/news/:newsID',
    passport.authenticate('bearer', { session: false }),
    getNews
);
// router.delete('/news/:idNews', deleteNews);
router.all('/news/:newsID', notExistError);


router.patch(
    '/news/:newsID/swapfavourite',
    passport.authenticate('bearer', { session: false }),
    swapFavourite
);
router.all('/news/:newsID/swapfavourite', notExistError);

module.exports = router;
