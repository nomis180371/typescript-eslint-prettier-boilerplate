"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const scrapperController_1 = require("./scrapper/scrapperController");
const program = new commander_1.Command();
program
    .command('start-scrapper')
    .description('Start the scrapper')
    .action(() => {
    const controller = new scrapperController_1.ScrapperController();
    controller
        .startScrapping()
        .then(() => {
        console.log('Scrapper started successfully.');
    })
        .catch((error) => {
        console.error('Error starting scrapper:', error);
        process.exit(1);
    });
});
program.parse(process.argv);
//# sourceMappingURL=cli.js.map