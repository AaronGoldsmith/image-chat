import React, { useState, useEffect } from 'react';
import Chat from './components/Chat/Chat';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import AuthStatus from './components/Authentication/AuthStatus';
import Feedback from './components/Feedback/Feedback';

import './App.css';
import { getAuth } from 'firebase/auth';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt, imageUrl:imageUrl, user_id: user.uid ?? 0}),
    }).then(res => res.json()).then(res2 => console.log(res2)) 
  }, [prompt]);

  const handlePromptReceived = (e) => {
    setPrompt(e);
  };

  const handleImageReceived = async (e) => {
    setImageUrl(e);
   
  };
  return (
    <div className="App">
      <AuthStatus getAuth={getAuth} onUserChange={(user => setUser(user))} />
      <Chat 
            user_id={user? user.uid : 0}
            handlePromptReceived={handlePromptReceived}
            handleImageReceived={handleImageReceived} />
      <ImageDisplay imageUrl={imageUrl} />
      <Feedback text={prompt}/>
    </div>
  );
};

export default App;
