import React from 'react';
import confLogo from '../images/logo.svg';
import './styles/Badge.css';

class Badge extends React.Component {
  render() {
    return (
      <div className="Badge">
        <div className="Badge__header">
          <img src={confLogo} alt="logo de la conferencia" />
        </div>

        <div className="Badge__section-name">
          <img
            className="Badge__avatar"
            src={this.props.urlAvatar}
            alt="Avatar"
          />
          <h1>
            {this.props.firstName} <br /> {this.props.lastName}
          </h1>
        </div>

        <div className="Badge__section-info">
          <h3>{this.props.event || 'Event name'}</h3>
          <div>{this.props.description || 'Event description'}</div>
        </div>

        <div className="Badge__footer">#ventureTicket</div>
      </div>
    );
  }
}

export default Badge;
