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
const destination_1 = require("../entity/destination");
const data_source_1 = require("../data-source");
const addDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const destination = new destination_1.Destination();
    destination.zipCode = req.body.zipCode;
    destination.name = req.body.name;
    destination.latitude = req.body.latitude;
    destination.longitude = req.body.longitude;
    const result = yield destination.save();
    if (result)
        return res.status(200).send(result);
    else
        return res.status(400);
});
const findDestinationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const destinationRepository = data_source_1.AppDataSource.getRepository(destination_1.Destination);
    const destinationById = yield destinationRepository.findOne({
        where: { id: req.params.id },
    });
    if (!destinationById)
        return res.sendStatus(404);
    return res.status(200).send(destinationById);
});
const findAllDestinations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const destinationRepository = data_source_1.AppDataSource.getRepository(destination_1.Destination);
    try {
        const allDestinations = yield destinationRepository.find();
        return res.status(200).send(allDestinations);
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
const updateDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const destinationRepository = yield data_source_1.AppDataSource.getRepository(destination_1.Destination);
    const destinationToUpdate = yield destinationRepository.findOne({
        where: { id: req.params.id },
    });
    destinationToUpdate.name = req.body.name;
    destinationToUpdate.latitude = req.body.latitude;
    destinationToUpdate.longitude = req.body.longitude;
    destinationToUpdate.zipCode = req.body.zipCode;
    const result = yield destinationRepository.save(destinationToUpdate);
    if (!result)
        return res.sendStatus(500);
    return res.sendStatus(200);
});
const deleteDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const destinationRepository = yield data_source_1.AppDataSource.getRepository(destination_1.Destination);
    const destinationToRemove = yield destinationRepository.findOne({
        where: { id: req.params.id },
    });
    const result = yield destinationRepository.remove(destinationToRemove);
    if (!result)
        return res.sendStatus(500);
    return res.sendStatus(200);
});
module.exports = {
    addDestination,
    findDestinationById,
    findAllDestinations,
    updateDestination,
    deleteDestination,
};
//# sourceMappingURL=destination.js.map