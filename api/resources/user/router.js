const {Router}= require('express');
const service = require('./service');
const passport = require('passport');
const {notFoundPage} = require('../../common/pages');

const createUser = async (req, res) => {
    const user = await service.createUser(req.body);
    res.status(200).json(user);
};

const createToken = async (req, res) => {
    const token = await service.createToken(req.user);
    res.status(200).json(token);
};

const changeProfile = async (req, res) => {
    const user = await service.changeProfile(
        req.user,
        req.body
    );
    res.status(200).json(user);
};

const getInfo = async (req, res) => {
    const info = await service.getUserInfo(req.user);
    res.status(200).json(info);
};

const deleteUser = async (req, res) => {
    const user = await service.deleteUser(req.user);
    res.status(200).send(user);
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
