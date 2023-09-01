import { User } from '../entity/user';
import { Request, Response } from 'express';
import { AppDataSource } from '..';

const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ where: [{ username }, { email }] });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: 'Username or email already taken.' });
  }

  const newUser = User.create({ username, email, password });
  await newUser.save();

  return res.status(201).json({ message: 'User created successfully.' });
};

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const userById = await userRepository.findOne({
    where: { id: req.params.id },
  });
  if (!userById) return res.sendStatus(404);
  return res.status(200).send(userById);
};

const updateUser = async (req: Request, res: Response) => {
  const userRepository = await AppDataSource.getRepository(User);
  const userToUpdate = await userRepository.findOne({
    where: { id: req.params.id },
  });
  if (!userToUpdate) return res.sendStatus(404);
  userToUpdate.username = req.body.username;
  userToUpdate.email = req.body.email;
  userToUpdate.password = req.body.password;

  const result = await userRepository.save(userToUpdate);
  if (!result) return res.sendStatus(500);
  return res.sendStatus(200);
};

const deleteUser = async (req: Request, res: Response) => {
  const userRepository = await AppDataSource.getRepository(User);
  const userToRemove = await userRepository.findOne({
    where: { id: req.params.id },
  });
  const result = await userRepository.remove(userToRemove);
  if (!result) return res.sendStatus(500);
  return res.sendStatus(200);
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
