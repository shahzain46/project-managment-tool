import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignInForm from '../../components/LoginForm';
import Auth from '../../Auth';
import { login } from '../../actions';

class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      user: {
        email: '',
        password: '',
      },
    };

    this.submitForm = this.submitForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  componentDidMount() {
    if (Auth.isUserAuthenticated()) {
      const { router } = this.context;
      router.history.replace('/dashboard');
    }
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  submitForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const { user: credentials } = this.state;
    const { onLogin } = this.props;

    onLogin(credentials).then(() => {
      const { router } = this.context;
      const locationState = router.route.location.state;
      const cameFromPath = locationState ? locationState.from : '/dashboard';
      router.history.replace(cameFromPath);
    });
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const { user } = this.state;
    user[field] = event.target.value;

    this.setState({ user });
  }

  render() {
    const { errors, user } = this.state;
    return (
      <SignInForm
        onSubmit={this.submitForm}
        onChange={this.changeUser}
        errors={errors}
        user={user}
      />
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  onLogin: credentials => dispatch(login(credentials)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
