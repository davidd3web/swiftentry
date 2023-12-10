import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import happy_person from '../../assets/images/happy_person.webp'
import BgSVG from '../BgSVG'

function CreateAccountForm(){

  const handleGoogleSuccess = (response) => {
    console.log(response);
    // Handle Google sign-in response, send to backend if necessary
  };


  const [createFullnameInput, setCreateFullnameInput] = useState('');
  const [createEmailInput, setCreateEmailInput] = useState('');
  const [createPasswordInput, setCreatePasswordInput] = useState('');
  const [errors, setErrors] = useState({ createFullnameInput: null, createEmailInput: null, createPasswordInput: null });

  // Validation Functions
  const validateFullName = (fullName) => {
    // Regular expression to match two or more words with spaces, hyphens, and apostrophes
    const pattern = /^[a-zA-Z'-]+(?: [a-zA-Z'-]+)+$/;
    return !pattern.test(fullName);
  };

  const validateEmail = (email) => {
    // Regular expression to match two or more words with spaces, hyphens, and apostrophes
    const pattern =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return !pattern.test(email);
  };

  const validatePassword = (password) => {
  // Regular expression to match a password with at least 8 characters
    const pattern = /^.{8,}$/;
    return !pattern.test(password);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let isInvalid = false;

    switch (name) {
      case 'createFullnameInput':
        isInvalid = validateFullName(value);
        break;
      case 'createEmailInput':
        isInvalid = validateEmail(value);
        break;
      case 'createPasswordInput':
        isInvalid = validatePassword(value);
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: isInvalid });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Frontend validation before sending data (optional, as you have backend validation)
    if (validateFullName(createFullnameInput) || validateEmail(createEmailInput) || validatePassword(createPasswordInput)) {
      console.log('Frontend validation failed');
      return;
    }
  
    // Data to be sent to the backend
    const formData = { 
      fullName: createFullnameInput, 
      email: createEmailInput, 
      password: createPasswordInput 
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response)
  
      if (response.ok) {
        setCreateFullnameInput('')
        setCreateEmailInput('');
        setCreatePasswordInput('');
        const data = await response.json();
        console.log('Form submitted successfully:', data);
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='form-container'>
      <div className='create-form-inner-container'>
        <h1>Create an Account</h1>
        <p>Let’s get started with your free account.</p>
        <form className='create-account-form' onSubmit={handleSubmit}>
          <div className={`input-field ${errors.createFullnameInput ? 'error' : ''}`}>
            <label htmlFor="createFullnameInput">Full Name:</label>
            <input 
              type='text' 
              name="createFullnameInput" 
              id="createFullnameInput"
              value={createFullnameInput}
              onChange={(e) => setCreateFullnameInput(e.target.value)}
              onBlur={handleBlur}
              className={errors.createFullnameInput ? 'error' : errors.createFullnameInput === false ? 'valid' : ''}
            />
            {errors.createFullnameInput && <p className="error-message">A full name is required.</p>}
          </div>
          <div className={`input-field ${errors.createEmailInput ? 'error' : ''}`}>
            <label htmlFor="createEmailInput">Your Email:</label>
            <input 
              type='email' 
              name="createEmailInput" 
              id="createEmailInput"
              value={createEmailInput}
              onChange={(e) => setCreateEmailInput(e.target.value)}
              onBlur={handleBlur}
              className={errors.createEmailInput ? 'error' : errors.createEmailInput === false ? 'valid' : ''} 
            />
            {errors.createEmailInput && <p className="error-message">A valid email address is required.</p>}
          </div>
          <div className={`input-field ${errors.createPasswordInput ? 'error' : ''}`}>
            <label htmlFor="createPasswordInput">Your Password:</label>
            <input 
              type='password' 
              name="createPasswordInput" 
              id="createPasswordInput"
              value={createPasswordInput}
              onChange={(e) => setCreatePasswordInput(e.target.value)}
              onBlur={handleBlur}
              className={errors.createPasswordInput ? 'error' : errors.createPasswordInput === false ? 'valid' : ''}
            />
            {errors.createPasswordInput && <p className="error-message">A valid password of at least 8 characters is required.</p>}
          </div>
          <div className='create-submit-container'>
            <button type='submit' className='create-form-submit-btn'>Create your account</button>
            <p>Or</p>
            <GoogleLogin 
              onSuccess={handleGoogleSuccess} 
              onError={() => console.log('Google sign-up failed')} 
              text="signup_with" 
              shape="pill"
              width="382px"
            />
           
          </div>
        </form>
        <p className='watermark-form-word'>Create</p>
      </div>
      <div>
        <div className='create-image-container'>
          <BgSVG />
          <img src={happy_person} alt='A young guy enjoying a healthy meal by the ocean' />
          <p className='create-subheadline one'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in.</p>
          <p className='create-subheadline two'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in.</p>
        </div>
      </div>
    </div>
  )
}

export default CreateAccountForm