import React from 'react';
import LoginWithGoogle from '../Authentication/LoginWithGoogle';
import './UserInfo.css';

const GuestInfo = ({updateLoggedInUser}) => {

  return (
    <div className="user-info">
      <img className="user-photo" src="https://picsum.photos/200/200.jpg" alt="" />
      <div className="user-details">
        <h2 className="display-name">Guest</h2>
      </div>
      <LoginWithGoogle updateLoggedInUser={user => updateLoggedInUser(user)}/>
    </div>
  );
};

export default GuestInfo;
