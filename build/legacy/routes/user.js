"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser, } = require('../controllers/user');
router.post('/user/create', createUser);
router.get('/user', getUserById);
router.put('/user/update', updateUser);
router.delete('/user/delete', deleteUser);
module.exports = router;
//# sourceMappingURL=user.js.map