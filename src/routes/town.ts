const express = require('express');
const router = express.Router();

const { addTown } = require('../controllers/town');

router.post('/town', addTown);

export {};
module.exports = router;
