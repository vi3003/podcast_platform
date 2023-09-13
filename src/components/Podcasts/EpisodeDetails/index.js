import React from 'react'
import Button from '../../common/Button'

const EpisodeDetails = ({ index, title, desc, audioFile, onClick }) => {
  return (
    <div>
        <h3 style={{ textAlign:'left', marginBottom: 0 }}>
          {index}. {title}
        </h3>
        <p style={{ textAlign:'left',marginLeft: '1rem', marginBottom: 0 }} className='podcast-desc' >
          {desc}
        </p>
        
        <div style={{marginLeft: '1rem'}}>
          <Button
           text={'Play'} 
           onClick={() => onClick(audioFile)} 
           width={'100px'} />
        </div>
    </div>
  )
}

export default EpisodeDetails