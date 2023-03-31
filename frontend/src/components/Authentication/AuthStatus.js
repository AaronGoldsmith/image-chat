import React, { useState, useEffect } from 'react';
import UserInfo from '../User/UserInfo';
import GuestInfo from '../User/GuestInfo'
import LoginWithGoogle from './LoginWithGoogle';
import { initializeApp } from 'firebase/app';

const AuthStatus = ({ getAuth, onUserChange }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const config = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, // may not be right
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    };

    initializeApp(config);
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      setUser(user);
      onUserChange(user); // Call the callback function with the updated user state
    });
    return unsubscribe;
  }, [getAuth, onUserChange]);

  const handleSignOut = async () => {
    try {
      await getAuth().signOut();
      setUser(null);
      onUserChange(null); // Call the callback function with the updated user state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user ? (
        <UserInfo user={user} authFunctions={{ signOut: handleSignOut, getAuth }} />
      ) : (
        <GuestInfo updateLoggedInUser={user => {
          setUser(user)
          onUserChange(user); // cb function with updated user state
        }} ></GuestInfo>
      )}
      {!user && <p>Guest</p>}
     
    </div>
  );
};

export default AuthStatus;
