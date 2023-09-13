import React from 'react'
import './styles.css';

const InputComponent = ({
    state,
    setState,
    type,
    placeholder,
    required
}) => {
  return (
    <input
     type={type} 
     value={state}
     placeholder={placeholder} 
     required={required}
     className='custom-input'
     onChange={(e)=>setState(e.target.value)} />
  )
}

export default InputComponent