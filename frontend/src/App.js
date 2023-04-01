import React, { useState, useEffect } from 'react';
import Chat from './components/Chat/Chat';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import AuthStatus from './components/Authentication/AuthStatus';
import Feedback from './components/Feedback/Feedback';

import './App.css';
const App = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    const id = user ? user.uid : "guest"+String(Math.floor(Math.random()*500000))
    if(prompt){
      fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt, imageUrl:imageUrl, user_id: id }),
      }).then(res => res.json()).then(res2 => console.log(res2)) 
    }
    
  }, [prompt]);

  const handlePromptReceived = (e) => {
    setPrompt(e);
  };

  const handleImageReceived = async (e) => {
    setImageUrl(e);
   
  };
  return (
    <div className="App">
      <AuthStatus onUserChange={(user => setUser(user))} />
      <Chat 
            handlePromptReceived={handlePromptReceived}
            handleImageReceived={handleImageReceived} />
      <ImageDisplay imageUrl={imageUrl} />
      <Feedback text={prompt}/>
    </div>
  );
};

export default App;
