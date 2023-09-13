import React, { useState } from 'react';
import './styles.css';
import Header from '../../components/common/Header';
import SignUpForm from '../../components/SignUp Components/SignUpForm';
import LoginForm from '../../components/SignUp Components/LoginForm';

const SignUpPage = () => {
  
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className='input-wrapper'>
        {!flag ? <h1>SignUp</h1> : <h1>Login</h1>}
        {!flag ? <SignUpForm /> : <LoginForm />}
        {!flag ? (
          <p>If you already have an account, 
            <span className='direct' onClick={() => setFlag(!flag)}> Log in.</span>
          </p>
        ) : (
          <p>Don't have an account? 
            <span className='direct' onClick={() => setFlag(!flag)}> Sign up.</span>
          </p>
        )}
      </div>
      
    </div>
  )
}

export default SignUpPage;