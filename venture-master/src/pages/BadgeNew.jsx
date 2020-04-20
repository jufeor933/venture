import React from 'react';
import md5 from 'md5';
import './style/BadgeNew.css';
import header from '../images/logo.svg';
import BadgeForm from '../components/BadgeForm';
import Badge from '../components/Badge';
import { UserService } from '../services/user.service';
import { TicketService } from '../services/ticket.service';

class BadgeNew extends React.Component {
  state = {
    user: UserService.user,
    error: '',
    loading: false,
    form: {
      event: '',
      category: 'education',
      description: '',
    },
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  async onSubmit(e) {
    e.preventDefault();
    if (!this.state.form.event) return;

    // save
    try {
      this.setState({ loading: true });
      await TicketService.create({
        ...this.state.form,
        user_id: this.state.user.id,
      });

      this.props.history.push('/statusTicket');
    } catch (error) {
        this.setState({ loading: false });
      console.log(error);
      this.setState({ error });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="BadgeNew__hero">
          <img className="img-fluid" src={header} alt="Logo" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={this.state.user.name}
                lastName={this.state.user.lastname}
                email={this.state.form.email}
                urlAvatar={`https://www.gravatar.com/avatar/${md5(
                  this.state.user.email,
                )}?d=identicon`}
                event={this.state.form.event}
                description={this.state.form.description}
              />
            </div>
            <div className="col-6">
              <BadgeForm
                onChange={this.handleChange}
                formValues={this.state.form}
                loading={this.state.loading}
                onSubmit={e => this.onSubmit(e)}
                onGoBack={() => this.props.history.push('/user')}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeNew;

//   <Badge firstName='JuanFdo' lastName='Cely' jobTitle='Developer React' urlTwitter='celyCode' urlAvatar='https://s.gravatar.com/avatar/c584b309a80f40572aa53c6d5fdd1166?s=80'/>
