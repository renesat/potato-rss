const {Router}= require('express');
const service = require('./service');
const passport = require('passport');
const {notFoundPage} = require('../../common/pages');

const getSources = async (req, res, next) => {
    await service.getSourcesList(
        req.user
    ).then(result => {
        res.status(result.status).json(result.data);
    }).catch(err => {
        next(err);
    });
};

const addSource = async (req, res, next) => {
    await service.addSource(
        req.user,
        req.body
    ).then(result => {
        res.status(result.status).json(result.data);
    }).catch(err => {
        next(err);
    });
};

const getSource = async (req, res, next) => {
    await service.getSource(
        req.user,
        req.params.sourceID
    ).then(result => {
        res.status(result.status).json(result.data);
    }).catch(err => {
        next(err);
    });
};

const changeSource = async (req, res, next) => {
    await service.changeSource(
        req.params.sourceID,
        req.body
    ).then(result => {
        res.status(result.status).json(result.data);
    }).catch(err => {
        next(err);
    });
};

const deleteSource = async (req, res, next) => {
    await service.deleteSource(
        req.params.sourceID
    ).then(result => {
        res.status(result.status).json(result.data);
    }).catch(err => {
        next(err);
    });
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
    notExistError
);


router.get(
    '/sources/:sourceID',
    passport.authenticate('bearer', { session: false }),
    getSource
);
router.put(
    '/sources/:sourceID',
    passport.authenticate('bearer', { session: false }),
    changeSource
);
router.delete(
    '/sources/:sourceID',
    passport.authenticate('bearer', { session: false }),
    deleteSource
);
router.all(
    '/sources/:sourceID',
    notExistError
);

module.exports = router;
