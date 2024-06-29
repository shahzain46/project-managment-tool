import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

const styles = {
  root: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    border: 'none',
    height: '32px',
    padding: '0 16px',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  primary: {
    color: 'white',
    backgroundColor: '#4f46ff',
  },
  basic: {
    border: '1px solid #445c7f2e',
  },
  subtle: {
    '&:hover': {
      backgroundColor: '#445c7f12',
    },
  },
};

const Button = (props) => {
  const {
    classes, disabled, children, type, className, look,
  } = props;
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={classnames(classes.root, classes[look], className)}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  look: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  className: '',
  look: 'primary',
};


export default injectSheet(styles)(Button);
