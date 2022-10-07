const pg = require('pg');


const config = {
    host: 'localhost',
    port: 5432,
    database: 'weekend_to_do_app'
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('connect to postgres');
});

pool.on('error', (err) => {
    console.log('error connecting to postgres', err);
});

module.exports = pool;