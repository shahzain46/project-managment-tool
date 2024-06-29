import React, { Component } from 'react';
import request from '../request';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = ({ users: [] });
  }

  componentDidMount() {
    // const { id } = this.props.match.params;
    // const url = `/users/${ id || ''}`;
    request('http://localhost:80/api/v1/users/', { fullPath: true })
      .then(response => response.json())
      .then(({ users }) => {
        this.setState({ users });
      });
  }

  render() {
    return (
      <div>
        <h3>Users:</h3>
        <ul>
          {this.state.users.map(({ id, name }) => (
            <li id={id} key={id}>
              <a href={`/users/${id}`}>{`${name}`}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;
