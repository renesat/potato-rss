const {Router}= require('express');
const service = require('./service');
const passport = require('passport');

const getInfo = (req, res) => {
    const info = service.getUserInfo(req.user);
    res.status(200).json(info);
};

// TODO: change
const changeProfile = (req, res) => {
    res.status(200).json(req.user.toJSON());
};

// TODO: delete
const deleteProfile = (req, res) => {
    res.status(405).send('');
};

const notExistError = async (req, res) => {
    res.status(405).send('');
};

const router = new Router();

router.get(
    '/user',
    getInfo
);
router.post(
    '/user',
    passport.authenticate('bearer', { session: false }),
    changeProfile
);
router.delete(
    '/user',
    passport.authenticate('bearer', { session: false }),
    deleteProfile
);
router.all('/user', notExistError);

module.exports = router;
