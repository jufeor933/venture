const dbModel = require('../../database/model');
const {
  verifyAndSanitize,
  serviceResponse,
  equalsTo,
} = require('./../../common/helpers/service.helper');

class TicketService {
  constructor() {
    this.model = dbModel;
    /** table name in the database */
    this.table = 'tickets';
  }

  /** get all not approved tickets */
  async getNotApproved() {
    const tickets = await this.model
      .select({ tickets: '*', users: ['id', 'email', 'name', 'lastname'] })
      .from(this.table)
      .innerJoin('users')
      .on('user_id', 'users.id')
      .where('status', '=', 'not_set')
      .orderBy(`${this.table}.id`, 'DESC')
      .exec();

    return serviceResponse(
      200,
      tickets.map(t => ({ ticket: t.tickets, user: t.users })),
    );
  }

  /** create new ticket */
  async create(data) {
    const requiredProps = ['event', 'category', 'user_id'];
    const optionalProps = ['description'];

    const { errors, sanitized } = verifyAndSanitize(
      data,
      requiredProps,
      optionalProps,
    );

    if (!!errors) {
      throw serviceResponse(404, errors);
    }

    // validate user
    const user = await this.model
      .select('id')
      .from('users')
      .where('id', '=', sanitized.user_id)
      .limit(1)
      .exec();

    if (!user.length) {
      throw serviceResponse(404, "user doesn't exists");
    }

    // save in the database
    const result = await this.model.insert(this.table).values(sanitized).exec();

    if (!result.insertId) {
      throw serviceResponse(500, 'the ticket has not been created');
    }

    return serviceResponse(201, true);
  }

  /** change ticket status */
  async changeStatus(ticketId, data) {
    // verify that it exists
    const exists = await this.model
      .select(['id', 'status'])
      .from(this.table)
      .where('id', '=', ticketId)
      .limit(1)
      .exec();

    if (!exists.length) {
      throw serviceResponse(404, "ticket doesn't exists");
    }

    const currentStatus = exists[0].status;

    if (currentStatus !== 'not_set') {
      throw serviceResponse(400, 'the status of this ticket has already been established');
    }

    const { errors, sanitized } = verifyAndSanitize(data, ['status']);

    if (!!errors) {
      throw serviceResponse(404, errors);
    }

    // values not allowed
    if (!equalsTo(sanitized.status, ['approved', 'not_approved'])) {
      throw serviceResponse(400, {
        prop: 'status',
        message: 'field only allow the «approved» and «not_approved» values',
      });
    }

    // update
    const result = await this.model
      .update(this.table)
      .values(sanitized)
      .where('id', '=', ticketId)
      .exec();

    if (!result.changedRows) {
      throw serviceResponse(500, 'the ticket has not been updated');
    }

    return serviceResponse(200, true);
  }
}

module.exports = { TicketService };
