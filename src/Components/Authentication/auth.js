import React from 'react';
import Login from './login';

//check to see if user is logged in (in localStorage)

const Auth = () => {
    return (
      <div>
        <div>
          <p>hello from Auth</p>
        </div>
        <div>
          <p>Auth Check</p>
          <Login />
        </div>
      </div>
    )
}

export default Auth;