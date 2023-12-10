import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  
  // Check if the current path starts with '/reset-password'
  const isResetPasswordPage = location.pathname.startsWith('/reset-password');

  // Determine whether to show or hide buttons based on the current path
  const showSignInButton = location.pathname !== '/signin' && !isResetPasswordPage && location.pathname !== '/forgotten_password';
  const showCreateAccountButton = location.pathname !== '/signup' && !isResetPasswordPage && location.pathname !== '/forgotten_password';

  return (
    <header className="App-header">
      <a href="/">swiftEntry</a>
      {showSignInButton && <Link to="/signin" className="link-style">Sign In</Link>}
      {showCreateAccountButton && <Link to="/signup" className="link-style">Create Account</Link>}
    </header>
  );
}

export default NavBar;
