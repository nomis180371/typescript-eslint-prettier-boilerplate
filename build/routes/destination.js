"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { uploadImage } = require('../middleware/multer-config');
const { addDestination, findDestinationById, findAllDestinations, updateDestination, deleteDestination, } = require('../controllers/destination');
const { addDestinationPicture, getDestinationPictureByDestinationId, } = require('../controllers/destinationPicture');
router.post('/destinations', addDestination);
router.get('/destinations', findAllDestinations);
router.get('/destinations/:id', findDestinationById);
router.put('/destinations/:id', updateDestination);
router.delete('/destinations/:id', deleteDestination);
router.post('/destination/picture', uploadImage, addDestinationPicture);
router.get('/destination/picture/:id', getDestinationPictureByDestinationId);
module.exports = router;
//# sourceMappingURL=destination.js.map