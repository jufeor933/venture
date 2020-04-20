const { Router } = require('express');
const { userRouter, ticketRouter } = require('./modules');
const router = Router();

router.use('/users', userRouter).use('/tickets', ticketRouter);

module.exports = router;
