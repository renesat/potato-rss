const {Router}= require('express');
const service = require('./service');
const passport = require('passport');
const {notFoundPage} = require('../../common/pages');
const {errorWrapper} = require('../../common/errors');

const createUser = async (req, res) => {
    let user = await service.createUser(
        req.body
    );
    res.status(200).json(user);
};

const createToken = async (req, res, next) => {
    let token = await service.createToken(
        req.user
    );
    res.status(200).json(token);
};

const changeProfile = async (req, res, next) => {
    let user = await service.changeProfile(
        req.user,
        req.body
    );
    res.status(200).json(user);
};

const getInfo = async (req, res, next) => {
    let user = await service.getUserInfo(
        req.user
    );
    res.status(200).json(user);
};

const deleteUser = async (req, res, next) => {
    let user = await service.deleteUser(
        req.user
    );
    res.status(200).json(user);
};

const notExistError = async (req, res) => {
    res.status(405).send(notFoundPage(req.url));
};

const router = new Router();

router.get(
    '/user',
    passport.authenticate('bearer', { session: false }),
    errorWrapper(getInfo)
);
router.put(
    '/user',
    passport.authenticate('bearer', { session: false }),
    errorWrapper(changeProfile)
);
router.delete(
    '/user',
    passport.authenticate('bearer', { session: false }),
    errorWrapper(deleteUser)
);
router.all('/user', notExistError);

router.post(
    '/user/registrate',
    errorWrapper(createUser)
);
router.all('/user/registrate', notExistError);

router.post(
    '/user/auth',
    passport.authenticate('basic', {session: false}),
    errorWrapper(createToken)
);
router.all('/user/auth', notExistError);

module.exports = router;
