import React from 'react';
import md5 from 'md5';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import { UserService } from '../services/user.service';
import { printTicketDate } from '../common/fuctions';

function status() {
  const history = useHistory();
  const [tickets, setTickets] = useState([]);
  const user = UserService.user;
  useEffect(() => {
    async function fetchTickets() {
      const data = await UserService.getTickets();
      setTickets(data);
    }

    fetchTickets();
  }, []);

  function printStatus(status) {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'not_approved':
        return 'Not Approved';
      default:
        return 'On hold';
    }
  }

  function onCloseSession() {
    UserService.closeSession();
    history.push('/');
  }

  return (
    <div>
      <buttom onClick={() => onCloseSession()} className="btn btn-primary">
        Sign Out
      </buttom>
      <Link to="/user" className="btn btn-primary">
        {' '}
        Back{' '}
      </Link>
      <h2 className="text-center">My tickets</h2>
      {tickets.map(ticket => {
        return (
          <div
            className="BadgesListItem"
            style={{ marginBottom: '.5rem   ' }}
            key={ticket.id}>
            <div className="row">
              <div className="col">
                <img
                  className="img-fluid"
                  src={`https://www.gravatar.com/avatar/${md5(
                    user.email,
                  )}?d=identicon`}
                  alt="Logo"
                />
              </div>

              <div className="col">
                <p>Id: {ticket.id} </p>
                <p>Event: {ticket.event}</p>
              </div>
              <div className="col">
                <p>Name: {`${user.name} ${user.lastname}`}</p>
                <p>WentSent: {printTicketDate(ticket.created_at)}</p>
              </div>
              <div className="col">
                <p>Description: {ticket.description || 'Not set'}</p>
                <p>Category: {ticket.category}</p>
              </div>
              <div className="col">
                <label>Status:</label>
                <div>{printStatus(ticket.status)}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default status;
