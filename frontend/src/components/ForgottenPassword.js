import React, { useState } from 'react';

function ForgottenPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setMessage('If your email is in our system, you will receive a password reset link.');
      }
    } catch (error) {
      console.error('Error sending password reset request:', error);
    }
  };

  return (
    <div className='form-container forgotten-password-container'>
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-field'>
          <label htmlFor="forgotten-email-input">Email:</label>
          <input id="forgotten-email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='create-submit-container'>
          <button type="submit" className='create-form-submit-btn'>Send Reset Link</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgottenPassword;
