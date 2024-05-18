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
exports.scrapperController = exports.ScrapperController = void 0;
const scrapperService_1 = require("./scrapperService");
class ScrapperController {
    constructor() {
        this.scrapperService = new scrapperService_1.ScrapperService();
    }
    startScrapping(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Start scrapping');
                const result = yield this.scrapperService.startScraping();
                return res.status(200).send(result);
            }
            catch (error) {
                console.log('ScrappingController.startScrapping', error);
                return res.status(500).send(error);
            }
        });
    }
}
exports.ScrapperController = ScrapperController;
exports.scrapperController = new ScrapperController();
//# sourceMappingURL=scrapperController.js.map