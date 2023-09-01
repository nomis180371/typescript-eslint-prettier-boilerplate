"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { createUser } = require('../controller/user');
router.post('/create', createUser);
module.exports = router;
//# sourceMappingURL=user.js.map