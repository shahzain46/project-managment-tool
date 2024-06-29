import React from 'react';
import PropTypes from 'prop-types';
import request from '../../request';

class AdminUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }

  componentDidMount() {
    return request('/users/')
      .then(response => response.json())
      .then(({ users }) => this.setState({ users }));
  }

  render() {
    const { users } = this.state;
    return (
      <div className="container text-align-center">
        <h1>Users:</h1>
        <ul>
          {users.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

AdminUsers.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminUsers;
