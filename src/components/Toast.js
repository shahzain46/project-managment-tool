import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { removeToast } from '../actions';

const styles = {
  toast: {
    padding: '12px',
    borderRadius: '4px',
  },
  info: {
    backgroundColor: 'blue',
    color: 'white',
  },
  success: {
    backgroundColor: 'green',
    color: 'white',
  },
  error: {
    backgroundColor: 'red',
    color: 'white',
  },
};

class Toast extends React.Component {
  constructor(props) {
    super(props);

    this.removeToast = this.removeToast.bind(this);
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => this.removeToast(), 5000);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      this.timeoutId = clearTimeout(this.timeoutId);
    }
  }

  removeToast() {
    const { id, onRemoveToast } = this.props;
    return onRemoveToast(id);
  }

  render() {
    const { classes, type, message } = this.props;

    return (
      <div className={classnames(classes.toast, classes[type])}>{message}</div>
    );
  }
}

Toast.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string,
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  onRemoveToast: PropTypes.func.isRequired,
};

Toast.defaultProps = {
  type: 'info',
  message: 'Default message',
};


export default compose(
  connect(null, { onRemoveToast: removeToast }),
  injectSheet(styles),
)(Toast);
