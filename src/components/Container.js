import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = props => ({
  root: {
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
  },
});

const Container = ({ classes, children }) => (
  <div className={classes.root}>{children}</div>
);

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Container.defaultProps = {
  type: 'fixed',
};

export default injectSheet(styles)(Container);
