import * as express from 'express';
import { Note } from '../models/note';

/**
 * Router de eliminacion
 */
export const deleteRouter = express.Router();



/**
 * Eliminacion de una nota a partir del nombre de la misma
 * Estado 404: No existe la nota en la base de datos
 * Estado 400: No se ha especificado el nombre de la nota
 * Estado 400: Otros errores
 * Estado 200: Nota eliminada
 */
deleteRouter.delete('/notes', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    Note.findOneAndDelete({name: req.query.name.toString()}).then((note) => {
      if (!note) {
        res.status(404).send();
      } else {
        res.send(note);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});


/**
 * Eliminacion de una nota a partir del id de la misma
 * Estado 404: No existe la nota en la base de datos
 * Estado 400: Otros errores
 * Estado 200: Nota eliminada
 */
deleteRouter.delete('/notes/:id', (req, res) => {
  Note.findByIdAndDelete(req.params.id).then((note) => {
    if (!note) {
      res.status(404).send();
    } else {
      res.send(note);
    }
  }).catch(() => {
    res.status(400).send();
  });
});
