import * as express from 'express';

/**
 * Router por defecto
 */
export const defaultRouter = express.Router();

defaultRouter.use(express.static('app/public'));

/**
 * Router por defecto
 * Devuelve el estado 501
 */
defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});