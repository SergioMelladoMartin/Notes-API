import * as express from 'express';
import { Note } from '../models/note';

/**
 * Router de obtencion
 */
export const getRouter = express.Router();

/**
 * Devuelve una nota a partir del nombre
 * Estado 404: No existe la nota en la base de datos
 * Estado 500: Otros errores
 * Estado 200: Nota devuelta
 */
getRouter.get('/notes', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  Note.find(filter).then((note) => {
    if (note.length !== 0) {
      res.status(201).send(note);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});

/**
 * Devuelve una nota a partir del id
 * Estado 404: No existe la nota en la base de datos
 * Estado 500: Otros errores
 * Estado 200: Nota devuelta
 */
getRouter.get('/notes/:id', (req, res) => {
  Note.findById(req.params.id).then((note) => {
    if (!note) {
      res.status(404).send();
    } else {
      res.send(note);
    }
  }).catch(() => {
    res.status(500).send();
  });
});
