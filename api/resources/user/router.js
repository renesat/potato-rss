const {Router}= require('express');
const service = require('./service');
const passport = require('passport');
const {notFoundPage} = require('../../common/pages');

const createUser = async (req, res, next) => {
    await service.createUser(
        req.body
    ).then(result => {
        res.status(result['status']).json(result['data']);
    }).catch(err => {
        next(err);
    });
};

const createToken = async (req, res, next) => {
    await service.createToken(
        req.user
    ).then(result => {
        res.status(result['status']).json(result['data']);
    }).catch(err => {
        next(err);
    });
};

const changeProfile = async (req, res, next) => {
    await service.changeProfile(
        req.user,
        req.body
    ).then(result => {
        res.status(result['status']).json(result['data']);
    }).catch(err => {
        next(err);
    });
};

const getInfo = async (req, res, next) => {
    await service.getUserInfo(
        req.user
    ).then(result => {
        res.status(result['status']).json(result['data']);
    }).catch(err => {
        next(err);
    });
};

const deleteUser = async (req, res, next) => {
    await service.deleteUser(
        req.user
    ).then(result => {
        res.status(result['status']).json(result['data']);
    }).catch(err => {
        next(err);
    });
};

const notExistError = async (req, res) => {
    res.status(405).send(notFoundPage(req.url));
};

const router = new Router();

router.get(
    '/user',
    passport.authenticate('bearer', { session: false }),
    getInfo
);
router.put(
    '/user',
    passport.authenticate('bearer', { session: false }),
    changeProfile
);
router.delete(
    '/user',
    passport.authenticate('bearer', { session: false }),
    deleteUser
);
router.all('/user', notExistError);

router.post(
    '/user/registrate',
    createUser
);
router.all('/user/registrate', notExistError);

router.post(
    '/user/auth',
    passport.authenticate('basic', {session: false}),
    createToken
);
router.all('/user/auth', notExistError);

module.exports = router;
