const express = require('express');
const tasksToDoRouter = express.Router();

// DB Connection
const pool = require('../modules/pool');

// GET
tasksToDoRouter.get('/', (req, res) => {
    const sqltext = `
        SELECT * FROM "tasksToDo"
        ORDER BY "taskName" ASC
    `;

    pool.query(sqltext)
        .then((dbRes) => {
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log('error getting tasks', err);
            res.sendStatus(500);
        });
});

// POST 
tasksToDoRouter.post('/', (req, res) => {
    console.log('Adding new task', req.body);

    const sqlText = `
        INSERT INTO "tasksToDo"
            ("taskName", "taskNotes", "taskIsComplete")
        VALUES
            ($1, $2, $3);
    `;

    const sqlParams = [
        req.body.taskName,
        req.body.taskNotes,
        req.body.taskIsComplete
    ];
    console.log('sqlText', sqlText);

    pool.query(sqlText, sqlParams)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('error in POST', err);
            res.sendStatus(500);
        });
});

// Add Delete task here
tasksToDoRouter.delete('/:id', (req, res) => {
    let taskId = req.params.id;
    console.log('in delete in /:id', taskId);

    const sqlText = `
        DELETE FROM "tasksToDo"
        WHERE "id" = $1;
    `;
    pool.query(sqlText, [taskId])
      .then((dbRes) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('delete failed in /:id', err);
        res.sendStatus(500);
      });
});

// Add PUT/update task here
tasksToDoRouter.put('/:id', (req, res) => {
    let taskId = req.params.id;
    console.log('in PUT in /:id', taskId);

    const sqlText = `
        UPDATE "tasksToDo"
        SET "taskIsComplete" = NOT "taskIsComplete"
        WHERE "id" = $1;
    `;
    
    pool.query(sqlText, [taskId])
      .then((response) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('PUT failed in /:id', err);
        res.sendStatus(500);
      });
});




module.exports = tasksToDoRouter;