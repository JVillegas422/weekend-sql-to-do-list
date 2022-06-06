const express = require('express');
const pool = require('../modules/pool')
const toDoRouter = express.Router();
// DB CONNECTION

toDoRouter.get('/', (req, res) => {
    const sqlQuery = `
        SELECT * FROM "toDo"
        ORDER BY "taskName" ASC
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
toDoRouter.post('/', (req, res)=>{
    
    const sqlQuery = `
    INSERT INTO "toDo"
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
        .then((dbRes) => {
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

    const sqlQuery = `
    UPDATE "toDo"
    SET "taskCompleted" = true
    WHERE id = $1;
    `;

    const sqlParams = [
        req.params.id,
    ];

    pool.query(sqlQuery, sqlParams)
    .then(() => {
        res.sendStatus(201)
    })
    .catch((err) => {
        console.log(`Put failed ${err}`);
        res.sendStatus(500);
    });

});

// DELETE
toDoRouter.delete('/:id', (req, res) => {
    let toDoId = req.params.id;
    console.log('Delete task', toDoId);
  
    let sqlQuery = `
    DELETE FROM "toDo" 
    WHERE "id" = $1;
    `;
    const sqlParams = [
        toDoId,             
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