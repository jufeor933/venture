import React from 'react';
import md5 from 'md5';
import { printTicketDate } from '../common/fuctions';
import './styles/BadgesList.css';
import { TicketService } from '../services/ticket.service';

class BadgeList extends React.Component {
  state = {
    /** badge selected */
    badge: null,
  };

  async onRadioChange(status, ticketId) {
    try {
      this.props.onLoading();
      await TicketService.changeStatus(ticketId, status);
      this.props.onRemoveTicket(ticketId);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <ul className="list-unstyled">
        {this.props.badges.map(badge => {
          return (
            <li key={badge.ticket.id}>
              <div className="BadgesListItem">
                <div className="row">
                  <div className="col">
                    <img
                      className="img-fluid"
                      src={`https://www.gravatar.com/avatar/${md5(
                        badge.user.email,
                      )}?d=identicon`}
                      alt="Logo"
                    />
                  </div>

                  <div className="col">
                    <p>Id: {badge.ticket.id} </p>
                    <p>Event: {badge.ticket.event}</p>
                  </div>
                  <div className="col">
                    <p>Name: {`${badge.user.name} ${badge.user.lastname}`}</p>
                    <p>WentSent: {printTicketDate(badge.ticket.created_at)}</p>
                  </div>
                  <div className="col">
                    <p>Description: {badge.ticket.description || 'Not set'}</p>
                    <p>Category: {badge.ticket.category}</p>
                  </div>
                  <div className="col">
                    <label>Status:</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`radio-${badge.ticket.id}`}
                        id={`radio-approved-${badge.ticket.id}`}
                        value="approved"
                        onChange={() =>
                          this.onRadioChange('approved', badge.ticket.id)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`radio-approved-${badge.ticket.id}`}>
                        Approved
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`radio-${badge.ticket.id}`}
                        id={`radio-not-approved-${badge.ticket.id}`}
                        value="not_approved"
                        onChange={() =>
                          this.onRadioChange('not_approved', badge.ticket.id)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`radio-not-approved-${badge.ticket.id}`}>
                        Not approved
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default BadgeList;
