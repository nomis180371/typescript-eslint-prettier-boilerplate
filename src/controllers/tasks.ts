import { Request, Response, Express } from 'express';
import { SourcesEnum } from '../types/sources';
import { VintedCatalogEnum } from '../types/params';

const initScrappingTask = async (req: Request, res: Response) => {
  try {
    // const newTask = await taskService.createTask();
    // scrapingInstance
    const task = {
      source: 'Vinted',
      params: {
        source: SourcesEnum['VINTED'],
        catalog: VintedCatalogEnum.MAN_SWEATER,
      },
    };
  } catch (error) {}
};
