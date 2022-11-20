const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Connecting to DB´
mongoose.connect("mongodb+srv://sergiomelladomartin:CDfrX4D1qn4X3HQt@cluster0.hlswq6y.mongodb.net/test")
    .then(db => console.log("DB connected"))
    .catch(err => console.log(err));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use(express.static(__dirname + '/public'));
app.use('/tasks', require('./routes/task'));

// Starting the server
app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
});