console.log('In the server');

const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
// const ToDoRouter = require('./routes/ToDo.router')

const app = express();

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve "static assets" (html, css, client-side js)
// from the server/public folder
app.use(express.static('server/public'));

// ROUTES
let toDoRouter = require('./routes/toDo.router')
app.use('/toDo', toDoRouter);

// Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });
