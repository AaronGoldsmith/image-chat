import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const withUser = (WrappedComponent) => {
  const WithUserComponent = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });

      return () => {
        unsubscribe();
      };
    }, []);

    return <WrappedComponent {...props} user={user} />;
  };

  return WithUserComponent;
};

export default withUser;
