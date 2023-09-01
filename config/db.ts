const { Pool } = require('pg');

const pool = new Pool({
  user: 'simus',
  database: 'travel_app',
  password: 'daphnelebb1803',
  port: 5432,
  host: 'localhost',
});

module.exports = { pool };
