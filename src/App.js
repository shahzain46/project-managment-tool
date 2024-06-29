import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route } from 'react-router-dom';
import injectSheet, { ThemeProvider } from 'react-jss';
import DashboardLayout from './layouts/Dashboard';
import AuthLayout from './layouts/Auth';
import history from './history';
import theme from './theme';
import NotFound from './pages/NotFound';
import ToastContainer from './components/ToastManager';
import LandingPage from './pages/Landing';

const styles = {
  '@global': {
    body: {
      margin: 0,
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    },
  },
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
};

const App = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <ToastContainer />
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Switch>
              <Route path="/dashboard" component={DashboardLayout} />
              <Route path="/auth" component={AuthLayout} />
              <Route exact path="/" component={LandingPage} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(App);
