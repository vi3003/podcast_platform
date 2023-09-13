import React from 'react';
import './styles.css'
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname; 
  return (
    <div className='navbar'>
      <div className='shadow'></div>
      <div className='links'>
        <Link to="/" className={currentPath === '/' ? 'active' : ''}>
          SignUp
        </Link>
        <Link to="/podcasts" className={currentPath === '/podcasts' ? 'active' : ''}>
          Podcasts
        </Link>
        <Link to="/create-podcast" className={currentPath === '/create-podcast' ? 'active' : ''}>
          Create Podcast
        </Link>
        <Link to="/profile" className={currentPath === '/profile' ? 'active' : ''}>
          Profile
        </Link>
      </div>
    </div>
  )
}

export default Header