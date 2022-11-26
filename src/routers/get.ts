import * as express from 'express';
import { Note } from '../models/note';

export const getRouter = express.Router();

getRouter.get("/notes", (req, res) => {
  const filter = req.query.name
    ? { name: req.query.name.toString() }
    : {};
  if (!filter.name) {
    res.status(403).send("The name is required");
    return;
  }

  Note.findOne(filter)
    .then((note) => {
      if (!note) {
        res.status(404).send("The note cannot be found");
      } else {
        res.status(200).send(note);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

getRouter.get("/notes/:id", (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      res.status(200).send(note);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
