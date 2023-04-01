import React, { useState, useEffect } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import UserInfo from '../User/UserInfo';
import GuestInfo from '../User/GuestInfo'

const AuthStatus = ({ onUserChange }) => {
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
    const auth = getAuth()

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        onUserChange(user); // Call the callback function with the updated user state
      } else {
        // If no user is signed in, sign in the user anonymously
        signInAnonymously(auth)
          .then((userCredential) => {
            // The user is signed in anonymously
            const anonUser = userCredential.user;
            setUser(anonUser);
            onUserChange(anonUser);
          })
          .catch((error) => {
            console.error('Error signing in anonymously:', error);
          });
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);


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
      {user.emailVerified ? (
        <UserInfo user={user} authFunctions={{ signOut: handleSignOut, getAuth }} />
      ) : (
        <GuestInfo updateLoggedInUser={user => {
          setUser(user)
          onUserChange(user); // cb function with updated user state
        }} ></GuestInfo>
      )}     
    </div>
  );
};

export default AuthStatus;
