const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

router.get('/', async (_, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.status(201).json(task);
});

router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).send({
            error: "Title and description are required"
        });
    }

    const { title, description } = req.body;
    const task = new Task({title, description});
    await task.save();
    res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).send({
            error: "Title and description are required"
        });
    }

    const { title, description } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, {title, description}, {new: true});
    res.status(201).json(task);
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(201).json({message: "Task deleted"});
});

module.exports = router;