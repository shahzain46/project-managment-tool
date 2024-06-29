import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import InjectSheet from 'react-jss';
import logo from '../../logo.svg';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '180px',
    zIndex: '1',
    backgroundColor: 'white',
    padding: `${theme.spacing.unit * 6}px`,
    boxShadow: '0px 4px 6px 0px rgba(42, 56, 68, 0.05)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    marginBottom: '64px',
  },
  logo__text: {
    fontWeight: 'bold',
    color: 'black',
    marginLeft: '8px',
    fontSize: '1.2rem',
    letterSpacing: '-0.04rem',
  },
  category: {
    marginBottom: '32px',
  },
  categoryTitle: {
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: 'bold',
    paddingLeft: '8px',
    marginBottom: '16px',
  },
  categoryItem: {
    display: 'block',
    textDecoration: 'none',
    margin: `${theme.spacing.unit}px 0`,
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

const Sidebar = (props) => {
  const { classes, workspaces, workspace, isWorkspaceFetched } = props;
  return (
    <div className={classes.root}>
      <Link to="/dashboard" className={classes.logo}>
        <img src={logo} alt="Logotype" />
        <span className={classes.logo__text}>Taska</span>
      </Link>

      <div className={classes.category}>
        <NavLink exact className={classes.categoryItem} to="/dashboard/">Dashboard</NavLink>
      </div>

      <div className={classes.category}>
        <div className={classes.categoryTitle}>Workspaces</div>

        {workspaces.map(({ id, name }) => (
          <NavLink key={id} className={classes.categoryItem} to={`/dashboard/workspace/${id}`}>{name}</NavLink>
        ))}
      </div>

      {isWorkspaceFetched && (
        <div className={classes.category}>
          <div className={classes.categoryTitle}>Manage</div>

          <NavLink className={classes.categoryItem} to={`/dashboard/workspace/${workspace.id}/feed`}>Feed</NavLink>
          <NavLink className={classes.categoryItem} to={`/dashboard/workspace/${workspace.id}/boards`}>Boards</NavLink>
          <NavLink className={classes.categoryItem} to={`/dashboard/workspace/${workspace.id}/settings`}>Settings</NavLink>
        </div>
      )}
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const composedSidebar = compose(
  connect(state => ({
    workspace: state.workspace.current,
    workspaces: state.workspaces.list,
    isWorkspaceFetched: state.workspace.isFetched,
  })),
  InjectSheet(styles),
)(Sidebar);

export default withRouter(composedSidebar);
