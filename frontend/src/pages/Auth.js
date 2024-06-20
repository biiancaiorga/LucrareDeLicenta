import React, { useState } from 'react';
import { registerUser, loginUser } from '../api';
import '../styles/Auth.css';
import Cookies from 'js-cookie';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [exiting, setExiting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggle = () => {
    setExiting(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setExiting(false);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPasswordError('');
      setSuccessMessage('');
    }, 300);
  };

  const handleLogout = () => {
    Cookies.remove('jwtToken');
    setSuccessMessage('You have been logged out successfully.');
    setTimeout(() => {
      window.location.reload();
    }, 500);
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
    if (!isLogin && password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    setPasswordError('');
    try {
      if (isLogin) {
        const response = await loginUser({ email, password });
        Cookies.set('jwtToken', response.message, { secure: true, sameSite: 'strict' });
        setSuccessMessage('You have successfully logged in!');
      } else {
        const response = await registerUser({ name, email, password });
        setSuccessMessage('Your account has been created successfully!');
      }
    } catch (error) {
      setSuccessMessage(`An error occurred while ${isLogin ? 'logging in' : 'creating your account'}.`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <IconButton onClick={togglePasswordVisibility}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </div>
          {!isLogin && (
            <div className="formGroup">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={!isLogin}
              />
              <IconButton onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>
          )}
          {!isLogin && passwordError && (
            <p className="error">{passwordError}</p>
          )}
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        {isLogin && <button onClick={handleLogout}>Logout</button>}
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
