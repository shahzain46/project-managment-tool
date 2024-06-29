import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InjectSheet from 'react-jss';
import UserMenu from './UserMenu';
import logo from '../../logo.svg';

const styles = theme => ({
  root: {
    position: 'relative',
    zIndex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: '70px',
    padding: `0 ${theme.spacing.unit * 6}px`,
    boxShadow: '0px 4px 6px 0px rgba(42, 56, 68, 0.05)',
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
  navLink: {
    textDecoration: 'none',
    margin: `0 ${theme.spacing.unit}px`,
    padding: `${theme.spacing.unit * 1.5}px ${theme.spacing.unit * 2}px`,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: '#a2b2c8',
    '&.active': {
      color: '#445c7f',
      backgroundColor: '#f2f6fa',
    },
    '&:hover': {
      color: '#445c7f',
    },
  },
});

const Navigation = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Link to="/dashboard" className={classes.logo}>
        <img src={logo} alt="Logotype" />
        <span className={classes.logo__text}>Taska</span>
      </Link>
      <div>
        <NavLink exact className={classes.navLink} to="/dashboard">Feed</NavLink>
        <NavLink className={classes.navLink} to="/dashboard/boards">Boards</NavLink>
        <NavLink className={classes.navLink} to="/dashboard/team">Team</NavLink>
      </div>
      <UserMenu />
    </div>
  );
};

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default InjectSheet(styles)(Navigation);
