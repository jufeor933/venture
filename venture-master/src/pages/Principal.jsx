import React from 'react';
import { UserService } from '../services/user.service';

class Principal extends React.Component {
  state = {
    form: {
      email: '',
      password: '',
    },
    error: '',
    formOk: false,
  };

  componentDidMount() {
    if (UserService.isLogged()) {
      switch (UserService.user.role) {
        case 'USER':
          this.props.history.push('/user');
          break;

        // admin
        default:
          this.props.history.push('/badges');
          break;
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    return { formOk: state.form.password && state.form.email };
  }

  async login() {
    if (!this.state.formOk) return;

    try {
      const { data } = await UserService.login({ ...this.state.form });
      localStorage.setItem('userLogged', data.id);
      UserService.user = data;

      this.props.history.push('/user');
    } catch (error) {
      console.log({ error });
      this.setState({ error });
    }
  }

  render() {
    return (
      <div className="container mt-4" style={{ maxWidth: '600px' }}>
        <h1>Authentication</h1>

        {!!this.state.error && (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert">
            <strong>Error!</strong> {this.state.error}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={e =>
              this.setState({
                form: { ...this.state.form, email: e.target.value },
              })
            }
            value={this.state.form.email}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={e =>
              this.setState({
                form: { ...this.state.form, password: e.target.value },
              })
            }
            value={this.state.form.password}
          />
        </div>
        <button
          className={`btn btn-primary ${!this.state.formOk ? 'disabled' : ''}`}
          onClick={() => this.login()}>
          Sign in
        </button>
      </div>
    );
  }
}

export default Principal;
