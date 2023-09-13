import React, { useEffect, useRef, useState } from 'react'
import './styles.css'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute} from 'react-icons/fa'

const AudioPlayer = ({ audioSrc, image }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [duration, setDuration] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef();

  const handleDuration = (e) => {
    setDuration(e.target.value);
    audioRef.current.currentTime = e.target.value
  }

  const togglePlay = () => {
    if(isPlaying) {
        setIsPlaying(false)
    }
    else {
        setIsPlaying(true)
    }
  };

  const toggleMute = () => {
    if(isMute) {
        setIsMute(false)
    }
    else {
        setIsMute(true)
    }
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = volume;

  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedmetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeUpdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedmetadata);
    audio.addEventListener("ended", handleEnded);
  
    return () => {
        audio.removeEventListener("timeUpdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedmetadata);
        audio.removeEventListener("ended", handleEnded);
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
        audioRef.current.play();
    } else {
        audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isMute) {
        audioRef.current.volume = volume;
        setVolume(1);
    } else {
        audioRef.current.volume = 0;
        setVolume(0);
    }
  }, [isMute]);

  return (
    <div className='custom-audio-player'>
        <img src={image} className='display-image-player' />
        <audio ref={audioRef} src={audioSrc} />
        <p className='icon' onClick={togglePlay}>{isPlaying ?<FaPause/> : <FaPlay />}</p>
        <div className='duration-flex'>
            <p>0:00</p>
            <input
             type='range' 
             max={duration}
             value={currentTime}
             onChange={handleDuration}
             className='duration-range'
            />
            <p>-21:00</p>
            <p className='icon' onClick={toggleMute} >{isMute ? <FaVolumeUp /> : <FaVolumeMute />}</p>
            <input
             type='range' 
             value={volume}
             max={1}
             min={0}
             step={0.01}
             onChange={handleVolume}
             className='volume-range'
            />
        </div>    
    </div>
  )
}

export default AudioPlayer