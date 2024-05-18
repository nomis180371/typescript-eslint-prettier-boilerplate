const express = require('express');
const router = express.Router();

const { newScrappingTask } = require('../controllers/scrappingTask');

router.post('/scrapping/newTask', newScrappingTask);

export {};
module.exports = router;
