import React from 'react';
import PropTypes from 'prop-types';
import injectsheet from 'react-jss';

const styles = theme => ({
  box: {
    backgroundColor: 'white',
    padding: `${theme.spacing.unit * 4}px`,
    borderRadius: `${theme.shape.borderRadius}px`,
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.1)',
  },
});

const Box = ({ children, classes }) => (
  <div className={classes.box}>{children}</div>
);

Box.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

export default injectsheet(styles)(Box);
