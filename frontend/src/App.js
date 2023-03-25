import React from 'react';
import Chat from './components/Chat/Chat';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import Feedback from './components/Feedback/Feedback';
import './App.css';

function App() {
  return (
    <div className="App">
      <Chat />
      <ImageDisplay />
      <Feedback />
    </div>
  );
}

export default App;
