const {Router}= require('express');
const service = require('./service');

const getSources = async (req, res) => {
  const sources = await service.getSourcesList(2); // TODO
  res.status(200).json(sources);
};

const addSource = async (req, res) => {
  const source = await service.addSource(); // TODO
  res.status(200).json(source);
};

const getSource = async (req, res) => {
  const source = await service.getSource(res.params.idSource); // TODO
  res.status(200).json(source);
};

const changeSource = async (req, res) => {
  const source = await service.changeSource(res.params.idSource); // TODO
  res.status(200).json(source);
};

const deleteSource = async (req, res) => {
  await service.deleteSource(res.params.idSource); // TODO
  res.status(200).send('');
};

// TODO
const notExistError = async (req, res) => {
  res.status(400).send('');
};

const router = new Router();
router.get('/sources', getSources);
router.post('/sources', addSource);
router.all('/sources', notExistError);

router.get('/sources/:idSource', getSource);
router.patch('/sources/:idSource', changeSource);
router.delete('/sources/:idSource', deleteSource);
router.all('/sources/:idSource', notExistError);

module.exports = router;
