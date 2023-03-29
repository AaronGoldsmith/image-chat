import React, { useState, useEffect } from 'react';
import Chat from './components/Chat/Chat';
import UserInfo from './components/User/UserInfo';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import Feedback from './components/Feedback/Feedback';
import './App.css';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider,
        signInWithPopup,
        onAuthStateChanged,
        getAuth, signOut } from 'firebase/auth';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
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
    // Listen for authentication state changes
    onAuthStateChanged(getAuth(),(user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });
  }, []);

  const handlePromptReceived = (e) => {
    setPrompt(e);
  };

  const handleImageReceived = (e) => {
    setImageUrl(e);
  };
  return (
    <div className="App">
      {user && <UserInfo user={user} authFunctions={{signOut,getAuth}} />}
      <Chat handlePromptReceived={handlePromptReceived}
            handleImageReceived={handleImageReceived} />
      <ImageDisplay imageUrl={imageUrl} />
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <Feedback text={prompt}/>
    </div>
  );
};


const provider = new GoogleAuthProvider();

function signInWithGoogle() {
  signInWithPopup(getAuth(),provider).then((result) => {
      // Handle successful sign-in
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      // Handle sign-in errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}
export default App;
