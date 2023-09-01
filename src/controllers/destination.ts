import { Destination } from '../entity/destination';
import { Request, Response } from 'express';
import { AppDataSource } from '../index';

const addDestination = async (req: Request, res: Response) => {
  const destination = new Destination();
  destination.zipCode = req.body.zipCode;
  destination.name = req.body.name;
  destination.latitude = req.body.latitude;
  destination.longitude = req.body.longitude;

  const result = await destination.save();
  if (result) return res.status(200).send(result);
  else return res.status(400);
};

const findDestinationById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const destinationRepository = AppDataSource.getRepository(Destination);
  const destinationById = await destinationRepository.findOne({
    where: { id: req.params.id },
  });
  if (!destinationById) return res.sendStatus(404);
  return res.status(200).send(destinationById);
};

const findAllDestinations = async (req: Request, res: Response) => {
  const destinationRepository = AppDataSource.getRepository(Destination);
  try {
    const allDestinations = await destinationRepository.find();
    return res.status(200).send(allDestinations);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const updateDestination = async (req: Request, res: Response) => {
  const destinationRepository = await AppDataSource.getRepository(Destination);
  const destinationToUpdate = await destinationRepository.findOne({
    where: { id: req.params.id },
  });
  destinationToUpdate.name = req.body.name;
  destinationToUpdate.latitude = req.body.latitude;
  destinationToUpdate.longitude = req.body.longitude;
  destinationToUpdate.zipCode = req.body.zipCode;

  const result = await destinationRepository.save(destinationToUpdate);
  if (!result) return res.sendStatus(500);
  return res.sendStatus(200);
};

const deleteDestination = async (req: Request, res: Response) => {
  const destinationRepository = await AppDataSource.getRepository(Destination);
  const destinationToRemove = await destinationRepository.findOne({
    where: { id: req.params.id },
  });
  const result = await destinationRepository.remove(destinationToRemove);
  if (!result) return res.sendStatus(500);
  return res.sendStatus(200);
};

module.exports = {
  addDestination,
  findDestinationById,
  findAllDestinations,
  updateDestination,
  deleteDestination,
};
