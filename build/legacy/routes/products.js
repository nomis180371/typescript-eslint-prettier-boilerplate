"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { migrateData } = require('../controllers/products');
router.post('/vinted/param', migrateData);
module.exports = router;
//# sourceMappingURL=products.js.map