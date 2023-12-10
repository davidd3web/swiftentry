import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import signin_img from '../../assets/images/signin_img.webp'
import BgSVG from '../BgSVG'

function SigninForm(){

  const handleGoogleSuccess = (response) => {
    console.log(response);
    // Handle Google sign-in response, send to backend if necessary
  };


  const [createEmailInput, setCreateEmailInput] = useState('');
  const [createPasswordInput, setCreatePasswordInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = { 
      email: createEmailInput, 
      password: createPasswordInput 
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setCreateEmailInput('');
        setCreatePasswordInput('');
        const data = await response.json();
        alert('Successfully signed in!');
        
      } else {
        setCreatePasswordInput('');
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className='signin-form-container'>
      <div className='create-form-inner-container'>
        <h1>Welcome back!</h1>
        <p>Let’s check on those savings!</p>
        <form className='signin-account-form' onSubmit={handleSubmit}>
          <div className={`input-field`}>
            <label htmlFor="createEmailInput">Your Email:</label>
            <input 
              type='email' 
              name="createEmailInput" 
              id="createEmailInput"
              value={createEmailInput}
              onChange={(e) => setCreateEmailInput(e.target.value)}
            />
          </div>
          <div className={`input-field `}>
            <label htmlFor="createPasswordInput">Your Password:</label>
            <input 
              type='password' 
              name="createPasswordInput" 
              id="createPasswordInput"
              value={createPasswordInput}
              onChange={(e) => setCreatePasswordInput(e.target.value)}
            />
          </div>
          <Link to='/forgotten_password' className='forgot-password-link'>Oopsie...I forgot my password</Link>
          <div className='create-submit-container'>
            <button type='submit' className='create-form-submit-btn'>Sign in now</button>
            <p>Or</p>
            <GoogleLogin onSuccess={handleGoogleSuccess} text="signin_with" shape="pill" width="382px" />
          </div>
        </form>
        <p className='watermark-form-word'>Sign in</p>
      </div>
      <div>
        <div className='create-image-container'>
          <BgSVG />
          <img src={signin_img} alt='A hand holding an iphone15 that is displaying the persons finances' />
          <p className='create-subheadline one'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in.</p>
          <p className='create-subheadline two'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in.</p>
        </div>
      </div>
    </div>
  )
}

export default SigninForm