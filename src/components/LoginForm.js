import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import Button from './Button';
import Input from './Input';
import logo from '../logo.svg';

const styles = {
  root: {
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: '320px',
  },
  row: {
    marginBottom: '4px',
  },
  button: {
    margin: '16px 0',
  },
  link: {
    color: 'black',
  },
};

const LoginForm = ({
  onSubmit, onChange, errors, user, classes,
}) => (
  <div className={classes.root}>
    <img src={logo} alt="Logotype" />
    <h2>Welcome back</h2>

    <form className={classes.form} onSubmit={onSubmit}>
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className={classes.row}>
        <Input
          id="email"
          label="Email"
          hideLabel
          required
          name="email"
          placeholder="Email address"
          onChange={onChange}
          value={user.email}
        />
        <div>{errors.email}</div>
      </div>

      <div className={classes.row}>
        <Input
          id="password"
          label="Password"
          hideLabel
          required
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          value={user.password}
        />
        <div>{errors.password}</div>
      </div>

      <div className={classes.button}>
        <Button type="submit" variant="primary">Login</Button>
      </div>

      <div>
        Dont have an account? <Link className={classes.link} to="/auth/register">Create one</Link>.
      </div>
    </form>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(LoginForm);
