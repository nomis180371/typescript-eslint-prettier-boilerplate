import { Command } from 'commander';
import { ScrapperController } from './scrapper/scrapperController';

const program = new Command();

program
  .command('start-scrapper')
  .description('Start the scrapper')
  .action(() => {
    const controller = new ScrapperController();
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
