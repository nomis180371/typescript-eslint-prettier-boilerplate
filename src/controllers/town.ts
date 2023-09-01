import { Request, Response } from 'express';
const { pool } = require('../../config/db.ts');

const addTown = async (req: Request, res: Response) => {
  try {
    const response = await pool.query(
      'INSERT INTO town (name, latitude, longitude) VALUES ($1, $2, $3)',
      [req.body.name, req.body.latitude, req.body.longitude]
    );
    return res.status(200).send(response);
  } catch (_) {
    return res.status(500);
  }
};

module.exports = {
  addTown,
};
