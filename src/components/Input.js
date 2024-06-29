import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

const styles = theme => ({
  root: {
    textAlign: 'left',
  },
  input: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    height: '40px',
    padding: '0 8px',
    backgroundColor: '#f7f8f9',
    borderRadius: '6px',
    border: '0',
    color: '#000',
    lineHeight: '1.6',
    transition: 'box-shadow .2s',
    width: '100%',
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${theme.pallete.primary}`,
    },
  },
  label: {
    marginBottom: '4px',
  },
  hiddenLabel: {
    display: 'none',
  },
});

const Input = ({
  autoFocus, classes, id, name, label, hideLabel, type, onChange, placeholder, disabled, required,
}) => {
  return (
    <div className={classes.root}>
      <label
        className={classnames(classes.label, { [classes.hiddenLabel]: hideLabel })}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        autoFocus={autoFocus}
        required={required}
        name={name}
        className={classes.input}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        onChange={onChange}
      />
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  hideLabel: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  placeholder: 'Placeholder',
  disabled: false,
  required: false,
  hideLabel: false,
  autoFocus: false,
};

export default injectSheet(styles)(Input);
