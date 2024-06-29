import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

/**
 * Simply check if user is really authenticated or not.
 */
const UserProvider = (props) => {
  const { isAuthenticated, children, location } = props;

  if (!isAuthenticated) {
    return <Redirect to={{ pathname: '/auth/login/', state: { from: location } }} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

UserProvider.propTypes = {
  children: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const composedUserProvider = compose(
  connect(state => ({ isAuthenticated: state.auth.isAuthenticated })),
  withRouter,
)(UserProvider);

export default composedUserProvider;
