"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const destination_1 = require("../entity/destination");
const destinationPicture_1 = require("../entity/destinationPicture");
const addDestinationPicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        const destinationRepository = data_source_1.AppDataSource.getRepository(destination_1.Destination);
        const destinationById = yield destinationRepository.findOne({
            where: { id: req.body.id },
        });
        if (!destinationById)
            return res.sendStatus(404);
        const destinationPicture = new destinationPicture_1.DestinationPicture();
        destinationPicture.fileName = file.filename;
        destinationPicture.path = file.path;
        destinationPicture.destination = destinationById;
        const destinationPictureRepository = data_source_1.AppDataSource.getRepository(destinationPicture_1.DestinationPicture);
        yield destinationPictureRepository.save(destinationPicture);
        res.json(destinationPicture);
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Failed to add image');
    }
});
const getDestinationPictureByDestinationId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destinationPictureRepository = data_source_1.AppDataSource.getRepository(destinationPicture_1.DestinationPicture);
        const destinationPictureByDestinationId = yield destinationPictureRepository.findOne({
            where: { id: req.params.id },
        });
        if (!destinationPictureByDestinationId)
            return res.sendStatus(404);
        return res.status(200).send(destinationPictureByDestinationId);
    }
    catch (error) { }
});
module.exports = {
    addDestinationPicture,
    getDestinationPictureByDestinationId,
};
//# sourceMappingURL=destinationPicture.js.map