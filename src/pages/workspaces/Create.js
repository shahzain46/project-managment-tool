import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InjectSheet from 'react-jss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from '../../components/Button';
import Box from '../../components/Box';
import Input from '../../components/Input';
import request from '../../request';
import { activateUser } from '../../actions';

const styles = theme => ({
  root: {
    textAlign: 'center',
  },
  form: {
    maxWidth: '320px',
    margin: '0 auto',
  },
  button: {
    marginTop: `${theme.spacing.unit * 4}px`,
  },
});

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = ({ workspace: { name: '' } });

    this.createWorkspace = this.createWorkspace.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async createWorkspace(event) {
    event.preventDefault();

    const { workspace } = this.state;
    const { onActivateUser } = this.props;

    const response = await request('/workspaces/create/', {
      method: 'POST',
      body: JSON.stringify({ name: workspace.name }),
    })
      .then(res => res.json())
      .then(res => res.workspace);

    onActivateUser();

    const { router } = this.context;
    router.history.replace(`/dashboard/workspaces/${response.id}/`);
  }

  handleChange(event) {
    const field = event.target.name;
    const { workspace } = this.state;
    workspace[field] = event.target.value;

    this.setState({ workspace });
  }

  render() {
    const { classes } = this.props;
    return (
      <Box>
        <div className={classes.root}>
          <h2>Create workspace</h2>
          <p>Or get invite by your team to start working</p>
          <form className={classes.form} onSubmit={this.createWorkspace}>
            <Input hideLabel placeholder="Workspace name" id="name" label="Name" required type="text" name="name" onChange={this.handleChange} />
            <div className={classes.button}>
              <Button type="submit">Create workspace</Button>
            </div>
          </form>
        </div>
      </Box>
    );
  }
}

Create.contextTypes = {
  router: PropTypes.object.isRequired,
};

Create.propTypes = {
  classes: PropTypes.object.isRequired,
};

const composedCreate = compose(
  connect(null, { onActivateUser: activateUser }),
  InjectSheet(styles),
)(Create);

export default composedCreate;
