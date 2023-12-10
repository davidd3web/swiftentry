import React, { useRef } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CreateAccountForm from './AuthForm/CreateAccountForm';
import SignInForm from './AuthForm/SignInForm';
import ForgottenPassword from './ForgottenPassword';
import ResetPassword from './ResetPassword';

const AnimatedRoute = ({ children, ...props }) => {
  const nodeRef = useRef(null);
  return (
    <CSSTransition nodeRef={nodeRef} {...props}>
      <div ref={nodeRef}>
        {children}
      </div>
    </CSSTransition>
  );
};


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <AnimatedRoute key={location.key} timeout={300} classNames="fade">
        <Routes location={location}>
          <Route path="*" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<CreateAccountForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/forgotten_password" element={<ForgottenPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>
      </AnimatedRoute>
    </TransitionGroup>
  );
}

export default AnimatedRoutes;
