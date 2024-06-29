/* eslint-disable prefer-destructuring,react/prop-types,react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import request from '../request';
import Button from '../components/Button';
import Box from '../components/Box';
import { verifyUser } from '../actions';

const styles = {
  root: {
    textAlign: 'center',
  },
};

class ConfirmationPage extends Component {
  constructor(props) {
    super(props);

    this.state = ({ isLoading: true });

    this.confirmUserEmail = this.confirmUserEmail.bind(this);
    this.resend = this.resend.bind(this);
  }

  componentDidMount() {
    const { isVerified, onVerifyUser } = this.props;
    if (isVerified) {
      const { router } = this.context;
      router.history.replace('/dashboard');
    } else {
      const token = this.props.match.params.token;

      if (token) {
        this.confirmUserEmail(token)
          .then(() => onVerifyUser());
      }
    }
  }

  confirmUserEmail(token) {
    return request('/confirmation', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
      .then(() => {
        const { router } = this.context;
        router.history.replace('/dashboard');
      });
  }

  async resend() {
    await request('/confirmation', {
      method: 'PUT',
    });
  }

  render() {
    const { isLoading } = this.state;
    const { classes } = this.props;

    if (isLoading) {
      return (
        <Box>
          <div className={classes.root}>
            <h1>Glad to see you! <span aria-label="Emoji clap" role="img">👋</span></h1>
            <p>To start using the app please confirm your email.</p>
            <Button type="button" onClick={this.resend}>Resend</Button>
          </div>
        </Box>
      );
    }
    return <div>Your account confirmed!</div>;
  }
}

ConfirmationPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

ConfirmationPage.propTypes = {
  classes: PropTypes.object.isRequired,
  isVerified: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isVerified: state.auth.user.isVerified,
});

const mapDispatchToProps = dispatch => ({
  onVerifyUser: () => dispatch(verifyUser()),
});

const composedConfirmationPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectSheet(styles),
)(ConfirmationPage);

export default composedConfirmationPage;
