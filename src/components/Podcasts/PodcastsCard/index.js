import React from 'react'
import './styles.css';
import { Link } from 'react-router-dom';

const PodcastCard = ({ id, title, displayImg }) => {
  return (
    <Link to={`/podcast/${id}`}>
        <div className='podcast-card'>
            <img className='display-img-podcast' src={displayImg} alt='display'/>
            <p className='title-podcast'>{title}</p>
        </div>
    </Link>
    
  )
}

export default PodcastCard