import React from 'react';

class BadgeForm extends React.Component {
  render() {
    return (
      <div>
        <h1>New Ticket</h1>
        <form onSubmit={this.props.onSubmit}>
          <div className="form-group">
            <label>Event</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="event"
              value={this.props.formValues.event}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              value={this.props.formValues.category}
              onChange={this.props.onChange}
              name="category">
              <option value="education">Education</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="description"
              value={this.props.formValues.description}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="submit"
              className={`btn btn-primary ${
                !this.props.formValues.event || this.props.loading
                  ? 'disabled'
                  : ''
              }`}>
              Save
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={this.props.onGoBack}>
              Go back
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default BadgeForm;

// el boton por defecto viene con: type="submit"
