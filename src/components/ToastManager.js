import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSheet from 'react-jss';
// import classnames from 'classnames';
import Toast from './Toast';

const styles = {
  container: {
    position: 'fixed',
    top: '32px',
    right: '32px',
    zIndex: '100',
  },
  toast: {
    marginBottom: '8px',
  },
};

const ToastManager = (props) => {
  const { toasts, classes } = props;
  return (
    <div className={classes.container}>
      {toasts.map(({ id, type, message }) => (
        <div key={id} className={classes.toast}>
          <Toast type={type} id={id} message={message} />
        </div>),
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  toasts: state.toast,
});

ToastManager.propTypes = {
  toasts: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const composedToastContainer = compose(
  connect(mapStateToProps),
  injectSheet(styles),
)(ToastManager);

export default composedToastContainer;
