/* eslint-disable prefer-destructuring,react/prop-types,react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import request from '../../request';
import { fetchWorkspaces } from '../../actions';
import Auth from '../../Auth';

class ConfirmationPage extends Component {
  constructor(props) {
    super(props);

    this.acceptInvite = this.acceptInvite.bind(this);
  }

  componentDidMount() {
    if (Auth.isUserAuthenticated()) {
      const { router } = this.context;
      return router.history.replace('/dashboard');
    }
    return this.acceptInvite();
  }

  acceptInvite() {
    const { onFetchWorkspaces, match: { params: { id, code } } } = this.props;
    return request(`/workspaces/${id}/accept/`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    })
      .then(response => response.json())
      .then((response) => {
        const { router } = this.context;
        router.history.replace(`/dashboard/workspace/${response.workspace.id}/`);
        onFetchWorkspaces();
      });
  }

  render() {
    return <div />;
  }
}

ConfirmationPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

ConfirmationPage.propTypes = {
  onFetchWorkspaces: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isVerified: state.auth.user.isVerified,
});

const mapDispatchToProps = dispatch => ({
  onFetchWorkspaces: () => dispatch(fetchWorkspaces()),
});

const composedConfirmationPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ConfirmationPage);

export default composedConfirmationPage;
