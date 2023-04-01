import React, { useState } from 'react';
import ContentWrapper from './components/ContentWrapper';
import AuthStatus from './components/Authentication/AuthStatus';
import FeedPage from './components/Feed/Feed';

import './App.css';
const App = () => {
  const [user, setUser] = useState(null);

 
  return (
    <div className="App">
      <AuthStatus onUserChange={(user => setUser(user))} />
      <ContentWrapper user={user} />
      <FeedPage />
    </div>
  );
};

export default App;
