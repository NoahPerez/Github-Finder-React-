import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//user is an Object here
const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt=""
        className="round-img"
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>

      <div>
        {' '}
        {/* Dynamic, button that bring us to User page  */}
        <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
          More
        </Link>
      </div>
    </div>
  );
};
UserItem.protoTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
