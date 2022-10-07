console.log('in server.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const tasksToDoRouter = require('./routes/tasksToDo.router');

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve "static assets" (html, css, client-side js)
// from the server/public folder
app.use(express.static('server/public'));

// ROUTES goes here 👇
app.use('/tasksToDo', tasksToDoRouter);


// Listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});