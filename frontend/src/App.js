import React, { useState } from 'react';
import Chat from './components/Chat/Chat';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import Feedback from './components/Feedback/Feedback';
import './App.css';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');

  const handlePromptReceived = (e) => {
    setPrompt(e);
  };

  const handleImageReceived = (e) => {
    setImageUrl(e);
  };
  return (
    <div className="App">
      <Chat handlePromptReceived={handlePromptReceived}
            handleImageReceived={handleImageReceived} />
      <ImageDisplay imageUrl={imageUrl} />
      <Feedback text={prompt}/>
    </div>
  );
};

export default App;
