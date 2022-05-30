const express = require('express');
const pool = require('../modules/pool')
const ToDoRouter = express.Router();
// DB CONNECTION

ToDoRouter.get('/', (req, res) => {{
    const sqlQuery = `
        SELECT * FROM task
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
}});

    

module.exports = ToDoRouter;