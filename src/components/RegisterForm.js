import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import Input from './Input';
import Button from './Button';
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

const RegisterForm = ({
  onSubmit, onChange, errors, user, classes,
}) => (
  <div className={classes.root}>
    <img src={logo} alt="Logotype" />
    <h2>Join us</h2>

    <form className={classes.form} onSubmit={onSubmit}>
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className={classes.row}>
        <Input
          id="name"
          required
          label="Name"
          hideLabel
          name="name"
          placeholder="Full name"
          onChange={onChange}
          value={user.name}
        />
        <div>{errors.name}</div>
      </div>

      <div className={classes.row}>
        <Input
          id="email"
          required
          label="Email"
          hideLabel
          name="email"
          placeholder="Email address"
          onChange={onChange}
          value={user.email}
        />
        <div>{errors.email}</div>
      </div>

      <div>
        <Input
          id="password"
          required
          label="Password"
          hideLabel
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          value={user.password}
        />
        <div>{errors.password}</div>
      </div>

      <div className={classes.button}>
        <Button type="submit">Join</Button>
      </div>

      <div>Already have an account? <Link className={classes.link} to="/auth/login">Log in</Link></div>
    </form>
  </div>
);

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(RegisterForm);
