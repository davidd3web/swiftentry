import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className='form-container new-password-container'>
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-field'>
          <label htmlFor="new-password-input">New Password:</label>
          <input id="new-password-input" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div className='create-submit-container'>
          <button type="submit" className='create-form-submit-btn'>Reset Password</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
