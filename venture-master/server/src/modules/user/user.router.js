const { Router } = require('express');
const { UserController } = require('./user.controller');

const router = Router();

const controller = new UserController();

router
  .get('/tickets/:userId', controller.getTickets.bind(controller))
  .get('/:id', controller.getById.bind(controller))
  .post('/login', controller.login.bind(controller))
  .post('/', controller.create.bind(controller));

module.exports = router;
