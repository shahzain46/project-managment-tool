import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FeedPage from '../pages/Feed';
import ProfilePage from '../pages/Profile';
import AdminLayout from './Admin';
import WorkspaceLayout from './Workspace';
import Workspaces from '../pages/workspaces/List';
import CreateWorkspace from '../pages/workspaces/Create';
import Sidebar from '../components/sidebar/Sidebar';
import Container from '../components/Container';
import NotFoundPage from '../pages/NotFound';
import ConfirmationPage from '../pages/Confirmation';
import UserFetcher from '../HOC/UserFetcher';
import AuthGuard from '../HOC/AuthGuard';
import CheckPermission from '../HOC/CheckPermission';
import RedirectResolver from '../HOC/RedirectResolver';
import { fetchWorkspaces } from '../actions';

const styles = theme => ({
  main: {
    backgroundColor: '#f5f7fa',
    flexGrow: '1',
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 2}px`,
  },
});

class DashboardLayout extends React.Component {
  componentDidMount() {
    const {
      isAuthenticated,
      isWorkspacesFetched,
      onFetchWorkspaces,
    } = this.props;

    if (!isWorkspacesFetched && isAuthenticated) onFetchWorkspaces();
  }

  render() {
    const { classes } = this.props;
    return (
      <AuthGuard>
        <UserFetcher>
          <RedirectResolver>
            <React.Fragment>
              {/* <header> */}
              {/* <Navigation /> */}
              {/* </header> */}
              <Sidebar />
              <main className={classes.main}>
                <Container>
                  <Switch>
                    {/* Admin routes */}
                    <Route path="/dashboard/admin" component={CheckPermission(AdminLayout, ['admin'])} />
                    {/* Workspaces routes */}
                    <Route path="/dashboard/workspace/:id" component={WorkspaceLayout} />
                    <Route exact path="/dashboard/workspaces" component={Workspaces} />
                    <Route exact path="/dashboard/workspaces/create" component={CreateWorkspace} />
                    {/* Profiles routes */}
                    <Route exact path="/dashboard/profile" component={ProfilePage} />
                    {/* Confirmation email route */}
                    <Route exact path="/dashboard/confirmation" component={ConfirmationPage} />
                    <Route exact path="/dashboard/confirmation/:token" component={ConfirmationPage} />
                    {/* Index route */}
                    <Route exact path="/dashboard" component={FeedPage} />
                    {/* 404 route */}
                    <Route exact path="/dashboard/404" component={NotFoundPage} />
                    <Route component={NotFoundPage} />
                  </Switch>
                </Container>
              </main>
            </React.Fragment>
          </RedirectResolver>
        </UserFetcher>
      </AuthGuard>
    );
  }
}

DashboardLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  onFetchWorkspaces: PropTypes.func.isRequired,
  isWorkspacesFetched: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isWorkspacesFetched: state.workspaces.isFetched,
});

const mapDispatchToProps = dispatch => ({
  onFetchWorkspaces: () => dispatch(fetchWorkspaces()),
});

const composedDashboardLayout = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectSheet(styles),
)(DashboardLayout);

export default composedDashboardLayout;
