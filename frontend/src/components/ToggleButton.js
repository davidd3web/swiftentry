import React from 'react';

const ToggleButton = ({ toggleTheme }) => {
  return (
    <div className="toggle-container">
      <label htmlFor="theme-toggle" className="toggle-label">Light / Dark Mode</label>
      <input type="checkbox" id="theme-toggle" className="toggle-checkbox" onChange={toggleTheme} />
      <label htmlFor="theme-toggle" className="slider"></label>
    </div>
  );
};

export default ToggleButton;