import * as express from 'express';
import { Note } from '../models/note';

/**
 * Router de actualizacion
 */
export const patchRouter = express.Router();

/**
 * Actualizacion de una nota a partir del nombre de la misma
 * Estado 404: No existe la nota en la base de datos
 * Estado 401: No se ha especificado el nombre de la nota
 * Estado 400: Otros errores
 * Estado 200: Nota actualizada
 */
patchRouter.patch('/notes', (req, res) => {
  if (!req.query.name) {
    res.status(401).send({
      error: 'A title must be provided',
  });

  } else {
    const allowedUpdates = ['name', 'content'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      Note.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((note) => {
        if (!note) {
          res.status(404).send();
        } else {
          res.send(note);
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }
});

/**
 * Actualizacion de una nota a partir del id de la misma
 * Estado 404: No existe la nota en la base de datos
 * Estado 400: Otros errores
 * Estado 200: Nota actualizada
 */
patchRouter.patch('/notes/:id', (req, res) => {
  const allowedUpdates = ['name', 'content'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  } else {
    Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).then((note) => {
      if (!note) {
        res.status(404).send();
      } else {
        res.send(note);
      }
    }).catch((error) => {
      res.status(400).send(error);
    });
  }
});
