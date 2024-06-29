import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Authorization High Order Component. Handles whether or not the user is allowed to see the page.
 *
 * @param WrappedComponent – Component needs to be rendered
 * @param allowedRoles – Allowed users roles
 * @returns {Component}
 */

const CheckPermission = (WrappedComponent, allowedRoles = ['user', 'admin']) => class WithPermission extends React.Component {
  render() {
    const { user } = this.props;

    if (!allowedRoles.includes(user.role)) return <Redirect to="/dashboard/404" />;

    return <WrappedComponent {...this.props} />;
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const composedAuthorization = compose(
  connect(mapStateToProps, null),
  CheckPermission,
);

export default composedAuthorization;
