import { AppDataSource } from '../data-source';
import { ScrappingTask } from '../entity/scrappingTask';
import { Request, Response } from 'express';

const newScrappingTask = async (req: Request, res: Response) => {
  const scrappingTaskRepository = AppDataSource.getRepository(ScrappingTask);
  const scrappingTask = ScrappingTask.create({
    isActive: checkForAccountActivation(),
    name: req.body.params || null,
    userId: parseTokenAndReturnsUserId(),
    params: req.body.params,
  });

  const result = await scrappingTaskRepository.save(scrappingTask);
  if (result) return res.status(200).send(result);
  else return res.status(500);
};

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
