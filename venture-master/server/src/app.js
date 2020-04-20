const express = require('express');
const cors = require('cors');
const router = require('./router');
const app = express();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/api', router);

module.exports = app;
