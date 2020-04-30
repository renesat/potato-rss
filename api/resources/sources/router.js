const {Router}= require('express');
const service = require('./service');
const passport = require('passport');
const {notFoundPage} = require('../../common/pages');

const getSources = async (req, res) => {
    const sources = await service.getSourcesList(req.user);
    res.status(200).json(sources);
};

const addSource = async (req, res) => {
    const source = await service.addSource(req.user, req.body);
    res.status(200).json(source);
};

const getSource = async (req, res) => {
    const source = await service.getSource(req.user, req.params.idSource);
    res.status(200).json(source);
};

const changeSource = async (req, res) => {
    const source = await service.changeSource(req.params.idSource, req.body);
    res.status(200).json(source);
};

const deleteSource = async (req, res) => {
    await service.deleteSource(req.params.idSource); // TODO
    res.status(200).send('');
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
    '/sources/:idSource',
    passport.authenticate('bearer', { session: false }),
    getSource
);
router.put(
    '/sources/:idSource',
    passport.authenticate('bearer', { session: false }),
    changeSource
);
router.delete(
    '/sources/:idSource',
    passport.authenticate('bearer', { session: false }),
    deleteSource
);
router.all(
    '/sources/:idSource',
    notExistError
);

module.exports = router;
