import React from 'react';
import './UserInfo.css';

const UserInfo = ({ user, authFunctions }) => {
  const { signOut, getAuth } = authFunctions;
  const { displayName, photoURL, emailVerified, metadata } = user;
  const { createdAt } = metadata
  const createdDate = new Date(parseInt(createdAt)).toLocaleDateString();
  const backendUrl = 'http://localhost:3001'; // Replace with your backend server's URL
  const imageUrl = `${backendUrl}/proxy-image?url=${encodeURIComponent(photoURL)}`;

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };
  
  return (
    <div className="user-info">
      <div className="user-info-content">
        <img className="user-photo" src={imageUrl} alt={displayName} />
        <div className="user-details">
          <h2 className="display-name">{displayName}
          {emailVerified && (
            <span className="verified-badge" title="Verified"> ✔</span>
          )}</h2>
          {/* <p className="created-date">Joined: {createdDate}</p> */}
        </div>
      </div>
     
      <button className="sign-out-button" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
};

export default UserInfo;
