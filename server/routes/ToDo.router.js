const express = require('express');
const pool = require('../modules/pool')
const toDoRouter = express.Router();
// DB CONNECTION

toDoRouter.get('/toDo', (req, res) => {
    const sqlQuery = `
        SELECT * FROM tasksToDo
        ORDER BY "name" ASC
    `;

    pool.query(sqlQuery)
        .then((dbRes) => {
            console.log('DB request success', dbRes.rows);
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log(`DB request failed`, err);

            res.sendStatus(500);
        });
});

// POST
toDoRouter.post('/toDo', (req, res)=>{
    let addTask = req.body;
    console.log('adding task!', addTask);
    
    const sqlQuery = `
    INSERT INTO "tasksToDo"
        ("taskName", "taskCompleted", "taskNotes")
    VALUES
        ($1, $2, $3);
`; 
const sqlParams = [
    req.body.taskName,        
    req.body.taskCompleted,         
    req.body.taskNotes,
];
console.log(sqlQuery);

pool.query(sqlQuery, sqlParams)
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`POST to db failed: ${err}`);
            res.sendStatus(500);
        });
});

// PUT
toDoRouter.put('/:id', (req, res) => {
    console.log('updating task stat', req.params.id);
    let taskId = req.params.id;
    
    let taskStatus = req.body.taskStatus;
    console.log('task status', taskStatus)

    let changeTaskStatus;
    if (taskStatus === 'true'){
        changeTaskStatus = false;
    }
    else {
        changeTaskStatus = true;
    }
    console.log('task status', changeTaskStatus)

    const sqlQuery = `
    UPDATE task
    SET "taskCompleted" = $2
    WHERE id = $1;
    `

    const sqlParams = [
        taskId,
        changeTaskStatus
    ];

    pool.query(sqlQuery, sqlParams)
    .then(() => {
        res.sendStatus(200)
    })
    .catch((err) => {
        console.log(`Failed to PUT ${err}`);
        res.sendStatus(500)
    });

});

// DELETE
toDoRouter.delete('/:id', (req, res) => {
    let taskId = req.params.id;
    console.log('Delete request for id', taskId);
  
    let sqlQuery = `
    DELETE FROM "tasksToDo" 
    WHERE "id" = $1;
    `;
    const sqlParams = [
        taskId,             
    ];
    pool.query(sqlQuery, sqlParams)
      .then(() => {
        console.log('task deleted');
        res.sendStatus(204);
      })
      .catch( (error) => {
        console.log(`Error making database query`, error);
        res.sendStatus(500); 
      })
  })



module.exports = toDoRouter;