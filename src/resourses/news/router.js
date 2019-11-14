const {Router}= require('express');
const service = require('./service');

const getNewsList = async (req, res) => {
  const news = await service.getNewsList(2); // TODO
  res.status(200).json(news);
};

const getNews = async (req, res) => {
  const news = await service.getNews(res.params.idNews); // TODO
  res.status(200).json(news);
};

const changeNews = async (req, res) => {
  const news = await service.changeNews(res.params.idNews); // TODO
  res.status(200).json(news);
};

const deleteNews = async (req, res) => {
  await service.deleteNews(res.params.idNews); // TODO
  res.status(200).send('');
};

// TODO
const notExistError = async (req, res) => {
  res.status(400).send('');
};

const router = new Router();
/**
 * @swagger
 * /news:
 *   get:
 *     description: get user news list
 */
router.get('/news', getNewsList);
router.all('/news', notExistError);

router.get('/news/:idNews', getNews);
router.patch('/news/:idNews', changeNews);
router.delete('/news/:idNews', deleteNews);
router.all('/news/:idNews', notExistError);

module.exports = router;
