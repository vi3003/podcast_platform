import React, { useState } from 'react';
import InputComponent from '../../common/input';
import Button from '../../common/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from'react-redux';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        console.log('Logging In')
        setLoading(true);
        if (email && password) {
          try {
            // Creating user's account
            const userCredential = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            const user = userCredential.user;
              
            // Accessing users's detail
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();
            console.log('userData', userData)

            // setting data for redux action
            dispatch(
              setUser({
                name: userData.name,
                email: user.email,
                uid: user.uid,
              })
            );
            setLoading(false);
            toast.success('Login Successful!')
            navigate('/profile');
          } catch (e) {
            console.log('error>>>', e);
            toast.error(e.message);
            setLoading(false);
          }
        }
        else {
          toast.error('Please fill all the fields');
          setLoading(false);
        } 
    }

    return (
        <>
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
          <Button
           text={loading ? 'Loading...' : 'Login'} 
           onClick={handleLogin}
           disabled={loading}
          />
        </>
    )
}

export default LoginForm;