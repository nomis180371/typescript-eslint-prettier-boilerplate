"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { addTown } = require('../controllers/town');
router.post('/town', addTown);
module.exports = router;
//# sourceMappingURL=town.js.map