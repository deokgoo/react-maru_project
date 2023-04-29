import React, { useState } from 'react';

import { firebaseLinkEmailSend } from '../util/firebaseAuth';

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  

  const handleLogin = async (event) => {
    event.preventDefault();
    firebaseLinkEmailSend(email);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
