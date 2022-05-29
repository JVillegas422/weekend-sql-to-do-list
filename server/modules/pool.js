const pg = require('pg');
const Pool = pg.Pool;


const config = {
    host: 'localhost',
    port: 5432,
    database: 'weekend-to-do-app'
};

const pool =new pg.Pool(config);

module.exports = pool;