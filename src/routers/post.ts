import * as express from 'express';
import { Note } from '../models/note';

/**
 * Router de creacion
 */
export const postRouter = express.Router();


/**
 * Creacion de una nota
 * Estado 400: Errores
 * Estado 201: Nota creada
 */
postRouter.post('/notes', (req, res) => {
  const note = new Note(req.body);

  note.save().then((note) => {
    res.status(201).send(note);
  }).catch((error) => {
    res.status(400).send(error);
  });
});
