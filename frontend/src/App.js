import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '../src/App.css';

import NavBar from './components/NavBar';
import AnimatedRoutes from './components/AnimatedRoutes';
import ToggleButton from './components/ToggleButton';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import GlobalStyles from './globalStyles';

function App() {
  // State to manage the theme
  const [theme, setTheme] = useState('light');

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />

          <div className="App">
            <NavBar />
            <div className='content'>
              <AnimatedRoutes />
            </div>
            <div className="theme-toggle">
              <ToggleButton toggleTheme={toggleTheme} />
            </div>
            <div className='background-colour-container'></div>
          </div>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
