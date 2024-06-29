import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Profile = ({ user }) => (
  <div className="container text-align-center">
    <h1>Hello! {user.name}</h1>
  </div>
);

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};


export default connect(state => ({ user: state.auth.user }))(Profile);
