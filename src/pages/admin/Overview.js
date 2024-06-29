import React from 'react';
import PropTypes from 'prop-types';

const AdminOverview = (props) => {
  const { user } = props;
  return (
    <div className="container text-align-center">
      <h1>Admin page. Your role is: {user.role}</h1>
    </div>
  );
};

AdminOverview.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminOverview;
