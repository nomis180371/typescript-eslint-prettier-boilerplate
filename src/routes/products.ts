const express = require('express');
const router = express.Router();

const { migrateData } = require('../controllers/products');

router.post('/vinted/param', migrateData);

export {};
module.exports = router;
