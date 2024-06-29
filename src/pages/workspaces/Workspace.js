import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/Input';
import Button from '../../components/Button';
import request from '../../request';
import Box from '../../components/Box';

class ItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = ({ email: '', members: [], isMembersLoaded: false });

    this.invite = this.invite.bind(this);
    this.destroy = this.destroy.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchMembers();
  }

  fetchMembers() {
    const { workspace } = this.props;
    return request(`/workspaces/${workspace.id}/members`)
      .then(response => response.json())
      .then(({ members }) => {
        this.setState({ members, isMembersLoaded: true });
      });
  }

  invite(event) {
    event.preventDefault();

    const { email, members } = this.state;
    const { workspace } = this.props;

    return request('/workspaces/invite', {
      method: 'POST',
      body: JSON.stringify({ workspaceId: workspace.id, email }),
    })
      .then(response => response.json())
      .then(({ member }) => this.setState({ members: [...members, member] }));
  }

  destroy() {
    const { match: { params: { id } } } = this.props;

    request(`/workspaces/${id}`, { method: 'DELETE' });
  }

  handleChange(event) {
    const email = event.target.value;
    this.setState({ email });
  }

  render() {
    const { members, isMembersLoaded } = this.state;
    const { workspace, isFetched } = this.props;

    if (!isFetched) {
      return <div>Loading workspace...</div>;
    }

    return (
      <React.Fragment>
        <h2>{workspace.name} </h2>
        <Box>
          <React.Fragment>
            <div>Invite people to workspace:</div>
            <br />
            <form onSubmit={this.invite}>
              <Input id="email" name="email" placeholder="Enter email" type="email" required label="User email" onChange={this.handleChange} />
              <br />
              <Button type="submit">Invite</Button>
            </form>

            <Button onClick={this.destroy} type="button">Destroy workspace</Button>

            <br />
            <br />
            <h3>Members:</h3>
            {
              isMembersLoaded
                ? <ul>{ members.map(({ name, email, status }) => <li key={email}>{name || email} ({status})</li>)}</ul>
                : <div>Loading members...</div>
            }
          </React.Fragment>
        </Box>
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  workspace: state.workspace.current,
  isFetched: state.workspace.isFetched,
}))(ItemPage);
