import React, { useEffect, useRef, useState } from 'react'
import './styles.css'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute} from 'react-icons/fa'

const AudioPlayer = ({ audioSrc, image }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
                             
  useEffect(() => {
    if (isPlaying) {
        audioRef.current.play();
    } else {
        audioRef.current.pause();
    }
  }, [isPlaying]);
  
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
  
  const handleDuration = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
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
        setIsMute(false);
    }
    else {
        setIsMute(true)
    }
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;

  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
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
    if (!isMute) {
        audioRef.current.volume = 1;
        setVolume(1);
    } else {
        audioRef.current.volume = 0;
        setVolume(0);
    }
  }, [isMute]);

  return (
    <div className='custom-audio-player'>
        <img src={image} className='display-image-player' alt='img'/>
        <audio ref={audioRef} src={audioSrc} />
        <p className='icon' onClick={togglePlay}>
          {isPlaying ? <FaPause/> : <FaPlay />}
        </p>
        <div className='duration-flex'>
            <p>{formatTime(currentTime)}</p>
            <input
             type='range' 
             min="0"
             max={duration}
             value={currentTime}
             onChange={handleDuration}
             step="0.001"
             className='duration-range'
            />
            <p>-{formatTime(duration - currentTime)}</p>
            <p className='icon' onClick={toggleMute} >
              {!isMute ? <FaVolumeUp /> : <FaVolumeMute />}
            </p>
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