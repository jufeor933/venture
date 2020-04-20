const { Controller } = require('./../../common/controller');
const { TicketService } = require('./ticket.service');

class TicketController extends Controller {
  constructor() {
    super();
    this.ticketService = new TicketService();
  }

  index(req, res) {
    res.json('tickets index works');
  }

  /** get all not approved tickets */
  async getNotApproved(req, res) {
    try {
      const result = await this.ticketService.getNotApproved();
      this.sendResponse(res, result);
    } catch (error) {
      console.log(error);
      this.handleError(res, error);
    }
  }

  /** create new ticket */
  async create(req, res) {
    try {
      const result = await this.ticketService.create(req.body);
      this.sendResponse(res, result);
    } catch (error) {
      console.log(error);
      this.handleError(res, error);
    }
  }

  /** change ticket status */
  async changeStatus(req, res) {
    try {
      const result = await this.ticketService.changeStatus(
        req.params.ticketId,
        req.body,
      );
      this.sendResponse(res, result);
    } catch (error) {
      console.log(error);
      this.handleError(res, error);
    }
  }
}

module.exports = { TicketController };
