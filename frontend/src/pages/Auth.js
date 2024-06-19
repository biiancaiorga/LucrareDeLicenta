import React, { useState } from 'react';
import { registerUser, loginUser } from '../api'; // Import the registerUser and loginUser functions
import '../styles/Auth.css';
import Cookies from 'js-cookie';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [exiting, setExiting] = useState(false);

  const handleToggle = () => {
    setExiting(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setExiting(false);
      setSuccessMessage(''); 
    }, 300);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isLogin && !validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one letter, one number, one uppercase letter, and one special character.');
      return;
    }
    setPasswordError('');
    try {
      if (isLogin) {
        // Login logic here
        console.log('Login:', { email, password });
        const response = await loginUser({ email, password });
          // Save the token in the cookie
          Cookies.set('jwtToken', response.message, { secure: true, sameSite: 'strict' });
          // Handle success (e.g., redirect to another page)
        setSuccessMessage('You have successfully logged in!');
      } else {
        // Register logic here
        console.log('Register:', { name, email, password });
        const response = await registerUser({ name, email, password });
        setSuccessMessage('Your account has been created successfully!');
      }
    } catch (error) {
      console.log(error);
      setSuccessMessage(`An error occurred while ${isLogin ? 'logging in' : 'creating your account'}.`);
    }
  };

  return (
    <div className={`authContainer ${exiting ? 'exiting' : ''}`}>
      <div className="authContent">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="formGroup">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isLogin && passwordError && (
              <p className="error">{passwordError}</p>
            )}
          </div>
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={handleToggle} className="toggleLink">
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
        {successMessage && (
          <p className="successMessage">{successMessage}</p>
        )}
      </div>
    </div>
  );
}

export default Auth;
