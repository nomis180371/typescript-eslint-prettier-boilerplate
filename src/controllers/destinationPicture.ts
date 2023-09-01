import { Request, Response, Express } from 'express';
import { AppDataSource } from '../index';
import { Destination } from '../entity/destination';
import { DestinationPicture } from '../entity/destinationPicture';

const addDestinationPicture = async (req: Request, res: Response) => {
  try {
    const file: Express.Multer.File = req.file;

    const destinationRepository = AppDataSource.getRepository(Destination);
    const destinationById = await destinationRepository.findOne({
      where: { id: req.body.id },
    });
    if (!destinationById) return res.sendStatus(404);

    const destinationPicture = new DestinationPicture();
    destinationPicture.fileName = file.filename;
    destinationPicture.path = file.path;
    destinationPicture.destination = destinationById;

    const destinationPictureRepository = AppDataSource.getRepository(
      DestinationPicture
    );
    await destinationPictureRepository.save(destinationPicture);

    res.json(destinationPicture);
  } catch (error) {
    console.log(error);
    res.status(500).json('Failed to add image');
  }
};

const getDestinationPictureByDestinationId = async (
  req: Request,
  res: Response
) => {
  try {
    const destinationPictureRepository = AppDataSource.getRepository(
      DestinationPicture
    );
    const destinationPictureByDestinationId = await destinationPictureRepository.findOne(
      {
        where: { id: req.params.id },
      }
    );
    if (!destinationPictureByDestinationId) return res.sendStatus(404);
    return res.status(200).send(destinationPictureByDestinationId);
  } catch (error) {}
};

module.exports = {
  addDestinationPicture,
  getDestinationPictureByDestinationId,
};
