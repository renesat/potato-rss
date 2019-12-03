const {Router}= require('express');
const service = require('./service');
const passport = require('passport');

const getSources = async (req, res) => {
    const sources = await service.getSourcesList(req.user);
    res.status(200).json(sources);
};

const addSource = async (req, res) => {
    const source = await service.addSource(req.user, req.body);
    res.status(200).json(source);
};

const getSource = async (req, res) => {
    const source = await service.getSource(req.params.idSource);
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
    res.status(405).send('');
};

const router = new Router();
router.use(passport.authenticate('bearer', { session: false }))
router.get('/sources', getSources);
router.post('/sources', addSource);
router.all('/sources', notExistError);

router.get('/sources/:idSource', getSource);
router.put('/sources/:idSource', changeSource);
router.delete('/sources/:idSource', deleteSource);
router.all('/sources/:idSource', notExistError);

module.exports = router;
