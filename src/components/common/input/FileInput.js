import React, { useState } from 'react';
import './styles.css';

const FileInput = ({accept, id, fileHandleFunc, text}) => {

    const [fileSelected, setFileSelected] = useState('');

    const onChange = e => {
        console.log(e.target.files);
        setFileSelected(e.target.files[0].name);
        fileHandleFunc(e.target.files[0]);
    }

  return (
    <>
        <label 
        htmlFor={id} 
        className={`custom-input ${!fileSelected ? "label-input" : "active"}`}
        >
            {fileSelected ? `${fileSelected} uploaded` : text}
        </label>
        <input
         type='file' 
         accept={accept} 
         id={id} 
         style={{display: 'none'}}
         onChange={onChange}
        />
    </>
    
  )
}

export default FileInput