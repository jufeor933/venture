const { UserService } = require('./user.service');
const { Controller } = require('./../../common/controller');

class UserController extends Controller {
  constructor() {
    super();
    this.userService = new UserService();
  }

  /** get user tickets */
  async getTickets(req, res) {
    try {
      const result = await this.userService.getTickets(req.params.userId);
      this.sendResponse(res, result);
    } catch (error) {
      console.log(error);
      this.handleError(res, error);
    }
  }

  /** get user data by id */
  async getById(req, res) {
    try {
      const result = await this.userService.getById(req.params.id);
      this.sendResponse(res, result);
    } catch (error) {
      console.log(error);
      this.handleError(res, error);
    }
  }

  /** create a new user */
  async create(req, res) {
    try {
      const result = await this.userService.create(req.body);
      this.sendResponse(res, result);
    } catch (error) {
      console.log(error);
      this.handleError(res, error);
    }
  }

  /** user login */
  async login(req, res) {
    try {
      const result = await this.userService.login(req.body);
      this.sendResponse(res, result);
    } catch (error) {
      console.log(error);
      this.handleError(res, error);
    }
  }
}

module.exports = { UserController };
