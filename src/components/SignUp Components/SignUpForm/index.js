import React from 'react'
import InputComponent from '../../common/input'
import Button from '../../common/Button';
import { useState } from 'react';
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from'react-redux';
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUpForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    console.log('Signing Up!!!');
    setLoading(true);
    if (password === confirmPassword && 
      password.length >= 10 &&
      email && fullName) {
      try {
        // Creating user's account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log('user>>>', user);
        // Saving users's detail
        await setDoc(doc(db, 'users', user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
          // profilPic: fileURL,
        });
        // save data for redux action
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("User profile created!")
        setLoading(false);
        navigate('/profile');
      } catch (e) {
        console.log('error>>>', e);
        toast.error(e.message);
      }
      setLoading(false);
    } 
    else {
      // throw an error
      if(password !== confirmPassword){
        toast.error('Passwords do not match!');
      }
      else if(password.length < 10){
        toast.error('Password too short!');
      }
      else if(!email) {
        toast.error('Email required!');
      }
      else if(!fullName) {
        toast.error('Full Name required!');
      }
    setLoading(false);
    }
  };
  return (
    <>
        <InputComponent
         state={fullName} 
         setState={setFullName}
         placeholder='Full Name'
         type='text'
         required={true}
         />
         <InputComponent
         state={email} 
         setState={setEmail}
         placeholder='Email'
         type='email'
         required={true}
         />
         <InputComponent
         state={password} 
         setState={setPassword}
         placeholder='Password'
         type='password'
         required={true}
         />
         <InputComponent
         state={confirmPassword} 
         setState={setConfirmPassword}
         placeholder='Confirm Password'
         type='password'
         required={true}
         />
         <Button text={loading ? 'Loading...' : 'SignUp'} disabled={loading} onClick={handleSignUp}/>
    </>
  )
}

export default SignUpForm