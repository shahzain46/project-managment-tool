import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

/**
 * Here we check user status like isActivated and isVerified
 * and based on that redirects to some routes
 */
const RedirectResolver = (props) => {
  const {
    children, user, location,
  } = props;

  if (!user.isVerified && !location.pathname.includes('/dashboard/confirmation')) {
    return <Redirect to="/dashboard/confirmation" />;
  }

  if (user.isVerified && !user.isActivated && location.pathname !== '/dashboard/workspaces/create') {
    return <Redirect to="/dashboard/workspaces/create" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

RedirectResolver.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const composedUserFetcher = compose(
  connect(mapStateToProps),
  withRouter,
)(RedirectResolver);

export default composedUserFetcher;
