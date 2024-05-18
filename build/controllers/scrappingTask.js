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
const scrappingTask_1 = require("../entity/scrappingTask");
const newScrappingTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scrappingTaskRepository = data_source_1.AppDataSource.getRepository(scrappingTask_1.ScrappingTask);
    const scrappingTask = scrappingTask_1.ScrappingTask.create({
        isActive: checkForAccountActivation(),
        name: req.body.params || null,
        userId: parseTokenAndReturnsUserId(),
        params: req.body.params,
    });
    const result = yield scrappingTaskRepository.save(scrappingTask);
    if (result)
        return res.status(200).send(result);
    else
        return res.status(500);
});
const checkForAccountActivation = () => {
    console.log('Checking user activation');
    return true;
};
const parseTokenAndReturnsUserId = () => {
    return '1234';
};
module.exports = {
    newScrappingTask,
};
//# sourceMappingURL=scrappingTask.js.map