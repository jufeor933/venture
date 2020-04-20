const dbModel = require('../../database/model');
const {
  verifyAndSanitize,
  serviceResponse,
} = require('./../../common/helpers/service.helper');

class UserService {
  constructor() {
    this.model = dbModel;
    /** table name in the database */
    this.table = 'users';
  }
  /** get user tickets */
  async getTickets(userId) {
    // get user data
    const tickets = await this.model
      .select({ tickets: '*' })
      .from(this.table)
      .innerJoin('tickets')
      .on('tickets.user_id', `${this.table}.id`)
      .where(`${this.table}.id`, '=', userId)
      .orderBy('id', 'DESC')
      .exec();

    if (!tickets.length) {
      throw serviceResponse(404, "user doesn't have tickets");
    }

    return serviceResponse(
      200,
      tickets.map(t => ({ ...t.tickets })),
    );
  }

  /** get user data by id */
  async getById(userId) {
    try {
      // get user data
      const user = await this.model
        .select('*')
        .from(this.table)
        .where('id', '=', userId)
        .limit(1)
        .exec();

      if (!user.length) {
        throw serviceResponse(404, "user doesn't exists");
      }

      return serviceResponse(200, user[0]);
    } catch (error) {
      throw error;
    }
  }

  /** create a new user */
  async create(data) {
    try {
      const { errors, sanitized } = verifyAndSanitize(data, [
        'name',
        'lastname',
        'email',
        'password',
      ]);

      if (!!errors) {
        throw serviceResponse(404, errors);
      }

      // verify if the email already exists
      const exists = await this.model
        .select('id')
        .from(this.table)
        .where('email', '=', sanitized.email)
        .limit(1)
        .exec();

      if (!!exists.length) {
        throw serviceResponse(400, 'email already exists');
      }

      // save in the database
      const result = await this.model
        .insert(this.table)
        .values(sanitized)
        .exec();

      if (!result.insertId) {
        throw serviceResponse(500, 'the user has not been created');
      }

      return serviceResponse(201, sanitized);
    } catch (error) {
      throw error;
    }
  }

  /** log in */
  async login(data) {
    try {
      const { errors, sanitized } = verifyAndSanitize(data, [
        'email',
        'password',
      ]);

      if (!!errors) {
        throw serviceResponse(404, errors);
      }

      // get user data
      const user = await this.model
        .select('*')
        .from(this.table)
        .where('email', '=', sanitized.email)
        .and('password', '=', sanitized.password)
        .limit(1)
        .exec();

      if (!user.length) {
        throw serviceResponse(404, 'invalid credentials');
      }

      return serviceResponse(200, user[0]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { UserService };
