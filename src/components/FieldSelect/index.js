import React from 'react';
import './style.css';

const FieldSelect = (props) => {
  const {label, placeholder, handleValue, handleOnChange} = props;
  return (
        <div className="fieldset">
            <label>{label}</label>
            <select className="campos" value={handleValue} onChange={handleOnChange} placeholder={placeholder}>
              {props.children}
            </select>
        </div>
  );
}

export default FieldSelect;