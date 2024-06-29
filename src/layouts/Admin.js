import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import OverviewPage from '../pages/admin/Overview';
import InvitationsPage from '../pages/admin/Invitations';
import UsersPage from '../pages/admin/Users';
import NotFoundPage from '../pages/NotFound';

function AdminLayout(props) {
  return (
    <React.Fragment>
      <ul>
        <li>
          <NavLink to="/dashboard/admin">Overview</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/admin/invitations">Invitations</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/admin/users">Users</NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path="/dashboard/admin" render={() => <OverviewPage {...props} />} />
        <Route exact path="/dashboard/admin/invitations" render={() => <InvitationsPage {...props} />} />
        <Route exact path="/dashboard/admin/users" render={() => <UsersPage {...props} />} />
        {/* 404 route */}
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(AdminLayout);
