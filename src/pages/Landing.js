import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InjectSheet from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../components/Button';
import logo from '../logo.svg';

const styles = theme => ({
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '32px 0',
  },
  nav__divider: {
    marginLeft: '8px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logo__text: {
    fontWeight: 'bold',
    color: 'black',
    marginLeft: '8px',
    fontSize: '1.2rem',
    letterSpacing: '-0.04rem',
  },
  container: {
    width: '100%',
    maxWidth: '960px',
    margin: '0 auto',
    padding: '0 16px',
  },
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: '1',
    paddingBottom: '4rem',
  },
  header: {
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '6rem',
    margin: '0',
  },
  description: {
    color: '#445c7f',
    fontSize: '1.4rem',
  },
  heroButton: {
    marginTop: '16px',
    height: '48px',
    fontSize: '1.1rem',
    boxShadow: '0px 4px 7px 0 rgba(0, 0, 0, 0.20)',
    transition: '100ms box-shadow ease-in-out, 50ms transform ease-in-out',
    '&:hover': {
      boxShadow: '0px 2px 2px 0 rgba(0, 0, 0, 0.20)',
    },
    '&:active': {
      transform: 'translateY(2px)',
    },
  },
});

const LandingPage = (props) => {
  const { classes, history, isAuthenticated } = props;

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <header className={classnames(classes.container, classes.header)}>
      <div className={classes.navigation}>
        <Link to="/" className={classes.logo}>
          <img src={logo} alt="Logotype" />
          <span className={classes.logo__text}>Taska</span>
        </Link>
        <nav>
          <Button onClick={() => history.replace('/auth/login')} className={classes.nav__divider} look="subtle" type="button">Login</Button>
          <Button onClick={() => history.replace('/auth/register')} className={classes.nav__divider} look="basic" type="button">Sign Up</Button>
        </nav>
      </div>
      <div className={classes.hero}>
        <div>
          <h1 className={classes.title}>Unlock new possibilities</h1>
          <p className={classes.description}>Level up your team productivity.</p>
          <Button onClick={() => history.replace('/auth/register')} size="4" type="button" className={classes.heroButton}>Get started free</Button>
        </div>
      </div>
    </header>
  );
};

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const composedLandingPage = compose(
  connect(store => ({ isAuthenticated: store.auth.isAuthenticated })),
  InjectSheet(styles),
  withRouter,
)(LandingPage);

export default composedLandingPage;
