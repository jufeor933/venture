const { Router } = require('express');
const { TicketController } = require('./ticket.controller');

const router = Router();

const controller = new TicketController();

router
  .get('/', controller.index)
  .get('/not-approved', controller.getNotApproved.bind(controller))
  .post('/', controller.create.bind(controller))
  .put('/status/:ticketId', controller.changeStatus.bind(controller))

module.exports = router;
