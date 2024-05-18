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
const sources_1 = require("../types/sources");
const params_1 = require("../types/params");
const initScrappingTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const newTask = await taskService.createTask();
        // scrapingInstance
        const task = {
            source: 'Vinted',
            params: {
                source: sources_1.SourcesEnum['VINTED'],
                catalog: params_1.VintedCatalogEnum.MAN_SWEATER,
            },
        };
    }
    catch (error) { }
});
//# sourceMappingURL=tasks.js.map