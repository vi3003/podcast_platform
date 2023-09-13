import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const user = useSelector((state)=>state.user.user);
  console.log('My user', user);
  
  if (!user) {
    return <p>Loading...</p>
  } 

  const handleLogOut = () => {
    signOut(auth).then(() => {
      // Sign-out sucessful
      toast.success("User Logged Out!");
    }).catch((error) => {
      // an error occured
      toast.error(error.message);
    });
  };
  
  return (
    <div>
      <Header />
      <div className='input-wrapper'>
        <h1>{user.name}</h1>
        <h3>{user.email}</h3>
        <h3>{user.uid}</h3>
        <Button onClick={handleLogOut} text={'Log Out'} />
      </div>  
    </div>
  )
}

export default ProfilePage