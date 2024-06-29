import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InjectSheet from 'react-jss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logout } from '../../actions';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  skeleton: {
    backgroundColor: '#f2f6fa',
    width: '90px',
    height: '14px',
    borderRadius: '8px',
  },
  link: {
    color: '#445c7f',
    textDecoration: 'none',
  },
  item: {
    marginLeft: '16px',
  },
});

class UserMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.deauthenticateUser = this.deauthenticateUser.bind(this);
  }

  deauthenticateUser() {
    const { onLogout } = this.props;
    const { router } = this.context;
    onLogout();
    router.history.replace('/');
  }

  render() {
    const { classes, user, isFetched } = this.props;
    return (
      <div className={classes.root}>
        {isFetched
          ? (
            <div className={classes.item}>
              <Link className={classes.link} to="/dashboard/profile">Hello, <strong>{user.name}</strong>!</Link>
            </div>
          )
          : <div className={classes.skeleton} />
        }
        {user.role === 'admin' && (
          <div className={classes.item}>
            <Link className={classes.link} to="/dashboard/admin">Manage</Link>
          </div>
        )}
        <div className={classes.item}>
          <button type="button" onClick={this.deauthenticateUser}>Logout</button>
        </div>
      </div>
    );
  }
}

UserMenu.contextTypes = {
  router: PropTypes.object.isRequired,
};

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isFetched: state.auth.isFetched,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

const composedUserMenu = compose(
  connect(mapStateToProps, mapDispatchToProps),
  InjectSheet(styles),
)(UserMenu);

export default composedUserMenu;
