const { Router }= require('express');
const service = require('./service');

const getSources = async (req, res) => {
    const sources = await service.getSourcesList(res.userId)

    res.status(200).json(sources)
}

let router = Router();
router.get('/sources', getSources)

module.exports = router;
