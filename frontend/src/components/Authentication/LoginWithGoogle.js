import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { GoogleAuthProvider,
  signInWithPopup,
  getAuth,  } from 'firebase/auth';
  
const LoginWithGoogle = ({updateLoggedInUser}) => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(getAuth(), provider).then((result) => {
      // Handle successful sign-in
      const user = result.user;
      updateLoggedInUser(user)
      console.log(user);
    })
    .catch((error) => {
      // Handle sign-in errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  };

  return (
    <div>
        <button onClick={handleGoogleLogin}>
          Login with Google
        </button>
    </div>
  
  );
};

export default LoginWithGoogle;
