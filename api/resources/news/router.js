const {Router}= require('express');
const service = require('./service');
const passport = require('passport');
const {notFoundPage} = require('../../common/pages');
const {errorWrapper} = require('../../common/errors');

const getNewsList = async (req, res, next) => {
    let newsList = await service.getNewsList(
        req.user,
        req.query.sourceID,
        req.query.page
    );
    res.status(200).json(newsList);
};

const getNews = async (req, res, next) => {
    let news = await service.getNews(
        req.params.newsID
    );
    res.status(200).json(news);
};

const swapFavourite = async (req, res, next) => {
    let news = await service.swapFavourite(
        req.params.newsID
    );
    res.status(200).json(news);
};

const addTag = async (req, res, next) => {
    let news = await service.addTag(
        req.params.newsID,
        req.params.tagName
    );
    res.status(200).json(news);
};

const removeTag = async (req, res, next) => {
    let news = await service.removeTag(
        req.params.newsID,
        req.params.tagName
    );
    res.status(200).json(news);
};


const notExistError = async (req, res) => {
    res.status(405).send(notFoundPage(req.url));
};

const router = new Router();
router.get(
    '/news',
    passport.authenticate('bearer', { session: false }),
    errorWrapper(getNewsList)
);
router.all(
    '/news',
    passport.authenticate('bearer', { session: false }),
    errorWrapper(notExistError)
);

router.get(
    '/news/:newsID',
    passport.authenticate('bearer', { session: false }),
    errorWrapper(getNews)
);
// router.delete('/news/:idNews', deleteNews);
router.all('/news/:newsID', errorWrapper(notExistError));

router.patch(
    '/news/:newsID/swapfavourite',
    passport.authenticate('bearer', { session: false }),
    errorWrapper(swapFavourite)
);
router.all('/news/:newsID/swapfavourite', errorWrapper(notExistError));

router.put(
    '/news/:newsID/addTag/:tagName',
    passport.authenticate('bearer', { session: false }),
    errorWrapper(addTag)
);
router.all(
    '/news/:newsID/addTag/:tagName',
    errorWrapper(notExistError)
);

router.delete(
    '/news/:newsID/removeTag/:tagName',
    passport.authenticate('bearer', { session: false }),
    errorWrapper(removeTag)
);
router.all(
    '/news/:newsID/removeTag/:tagName',
    errorWrapper(notExistError)
);



module.exports = router;
