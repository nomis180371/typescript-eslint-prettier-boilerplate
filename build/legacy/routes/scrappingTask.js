"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { newScrappingTask } = require('../controllers/scrappingTask');
router.post('/scrapping/newTask', newScrappingTask);
module.exports = router;
//# sourceMappingURL=scrappingTask.js.map