const pg = require('pg');
// const Pool = pg.Pool;


const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'weekend_to_do'
});

// const config = {
//     host: 'localhost',
//     port: 5432,
//     database: 'weekend_to_do'
// };

// const pool =new pg.Pool(config);

module.exports = pool;