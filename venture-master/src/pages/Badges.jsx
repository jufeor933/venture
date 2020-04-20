import React from 'react';
import { Link } from 'react-router-dom';

import './style/Badges.css';
import confLogo from '../images/logo.svg';
import BadgesList from '../components/BadgesList';
import { TicketService } from '../services/ticket.service';
import { UserService } from '../services/user.service';

class Badges extends React.Component {
  state = {
    loading: true,
    error: null,
    data: [],
  };

  // para cualquier llamado de una api se hace a traves del siguiente metodo
  componentDidMount() {
    this.fetchData();
  }

  onRemoveTicket(ticketId) {
    this.setState({
      data: this.state.data.filter(badge => badge.ticket.id !== ticketId),
      loading: false,
    });
  }

  onCloseSession() {
    UserService.closeSession();
    this.props.history.push('/');
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      // la volvemos asíncrona por ende el fetchdata tambn
      const data = await TicketService.getNotApproved();
      this.setState({ loading: false, data: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.error) {
      return `Erro: ${this.state.error.message}`;
    }

    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img
                className="Badges_conf-logo"
                src={confLogo}
                alt="Cont Logo"
              />
            </div>
          </div>
        </div>

        <div className="Badge__container">
          <div className="container">
            {this.state.loading && (
              <h3 className="text-center">Loading, please wait...</h3>
            )}
            {!this.state.data.length && (
              <h3 className="text-center">No tickets availables</h3>
            )}
            <div className="d-flex justify-content-center mb-2">
              <button
                className="btn-primary"
                onClick={() => this.onCloseSession()}>
                CLOSE SESSION
              </button>
            </div>
            <div className="BadgesList">
              {!!this.state.data && (
                <BadgesList
                  badges={this.state.data}
                  onRemoveTicket={e => this.onRemoveTicket(e)}
                  onLoading={() => this.setState({ loading: true })}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Badges;
