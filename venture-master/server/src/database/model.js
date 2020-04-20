const { createPool, santzModel } = require('santz');
const {
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
} = require('../common/constants');

// database connection config
const config = {
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
};

const pool = createPool(config);

module.exports = santzModel({
  pool: pool,
  strict: false,
  showQuery: false,
  nestTables: true,
});
