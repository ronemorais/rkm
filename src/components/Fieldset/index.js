import React from 'react';
import './style.css';

const Fieldset = (props) => {
  const {label, type, placeholder, autofocus, handleValue, handleOnChange, multiline} = props;
  return (
        <div className="fieldset">
            <label>{label}</label>
            { 
              !multiline ? <input type={type} placeholder={placeholder} className="campos" autoFocus={autofocus} value={handleValue} onChange={handleOnChange} /> 
              :
            <textarea placeholder={placeholder} value={handleValue} className="campos" rows={4} onChange={handleOnChange}>{handleValue}</textarea>
            }
        </div>
  );
}

export default Fieldset;