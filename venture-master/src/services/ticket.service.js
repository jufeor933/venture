import { http } from './http.service';

export class TicketService {
  static async create(values) {
    const { data } = await http.post('/tickets', values);
    return data;
  }

  /** get all not approved tickets */
  static async getNotApproved() {
    const { data } = await http.get('/tickets/not-approved');
    return data;
  }

  /** change ticket status */
  static async changeStatus(ticketId, status) {
    const { data } = await http.put(`/tickets/status/${ticketId}`, { status });
    return data;
  }
}
