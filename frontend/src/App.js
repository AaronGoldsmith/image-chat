import React, { useState } from 'react';
import ContentWrapper from './components/ContentWrapper';
import AuthStatus from './components/Authentication/AuthStatus';

import './App.css';
const App = () => {
  const [user, setUser] = useState(null);

 
  return (
    <div className="App">
      <AuthStatus onUserChange={(user => setUser(user))} />
      <ContentWrapper user={user} />
    </div>
  );
};

export default App;
