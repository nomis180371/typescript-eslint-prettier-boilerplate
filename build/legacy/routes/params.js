"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { getScrappingDataById } = require('../controllers/scrappingParams');
router.get('/getParamsById', getScrappingDataById);
module.exports = router;
//# sourceMappingURL=params.js.map