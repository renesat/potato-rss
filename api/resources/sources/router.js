const {Router}= require('express');
const service = require('./service');
const passport = require('passport');
const {notFoundPage} = require('../../common/pages');
const {errorWrapper} = require('../../common/errors');

const getSources = async (req, res, next) => {

    let sources = await service.getSourcesList(
        req.user
    );
    res.status(200).json(sources);
};

const addSource = async (req, res, next) => {
    let source = await service.addSource(
        req.user,
        req.body
    );
    res.status(200).json(source);
};

const getSource = async (req, res, next) => {
    let source = await service.getSource(
        req.user,
        req.params.sourceID
    );
    res.status(200).json(source);
};

const changeSource = async (req, res, next) => {
    let source = await service.changeSource(
        req.user,
        req.params.sourceID,
        req.body
    );
    res.status(200).json(source);
};

const deleteSource = async (req, res, next) => {
    let source = await service.deleteSource(
        req.user,
        req.params.sourceID,
    );
    res.status(200).json(source);
};

const notExistError = async (req, res) => {
    res.status(405).send(notFoundPage(req.url));
};

const router = new Router();
router.get(
    '/sources',
    passport.authenticate('bearer', { session: false }),
    getSources
);
router.post(
    '/sources',
    passport.authenticate('bearer', { session: false }),
    addSource
);
router.all(
    '/sources',
    notExistError
);

// router.get(
//     '/sources/update',
//     passport.authenticate('bearer', { session: false }),
//     updateNews
// );
router.all(
    '/sources/update',
    errorWrapper(notExistError)
);


router.get(
    '/sources/:sourceID',
    passport.authenticate('bearer', { session: false }),
    errorWrapper(getSource)
);
router.put(
    '/sources/:sourceID',
    passport.authenticate('bearer', { session: false }),
    errorWrapper(changeSource)
);
router.delete(
    '/sources/:sourceID',
    passport.authenticate('bearer', { session: false }),
    errorWrapper(deleteSource)
);
router.all(
    '/sources/:sourceID',
    errorWrapper(notExistError)
);

module.exports = router;
