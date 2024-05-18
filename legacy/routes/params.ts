const express = require('express');
const router = express.Router();

const { getScrappingDataById } = require('../controllers/scrappingParams');

router.get('/getParamsById', getScrappingDataById);

export {};
module.exports = router;
