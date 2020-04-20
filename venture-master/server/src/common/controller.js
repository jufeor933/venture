class Controller {
  sendResponse(res, { status, response }) {
    return res.status(status).json(response);
  }

  /** handle services errors */
  handleError(res, error) {
    // custom error
    if (error.hasOwnProperty('status')) {
      const { status, response } = error;
      return res.status(status).json(response);
    }

    // internal server error
    res.status(500).json(error.message);
  }
}

module.exports = { Controller };
