import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchProfile } from '../actions/index';

/**
 * At this point we know that user is authenticated, has token
 * and now we can fetch his profile if it's not fetched yet.
 * Block render child component while profile is fetching.
 */
class UserFetcher extends React.Component {
  componentWillMount() {
    const { isFetched, onFetchProfile } = this.props;

    if (!isFetched) onFetchProfile();
  }

  render() {
    const { children, isFetched } = this.props;

    if (!isFetched) {
      return <div />;
    }

    return <React.Fragment>{children}</React.Fragment>;
  }
}

UserFetcher.propTypes = {
  children: PropTypes.object.isRequired,
  isFetched: PropTypes.bool.isRequired,
  onFetchProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isFetched: state.auth.isFetched,
});

const mapDispatchToProps = dispatch => ({
  onFetchProfile: () => dispatch(fetchProfile()),
});

const composedUserFetcher = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(UserFetcher);

export default composedUserFetcher;
