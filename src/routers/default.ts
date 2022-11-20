import * as express from 'express';

/**
 * Router por defecto
 */
export const defaultRouter = express.Router();

/**
 * Router por defecto
 * Devuelve el estado 501
 */
defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});