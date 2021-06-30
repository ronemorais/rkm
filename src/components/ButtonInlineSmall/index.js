import React from 'react';
import Loader from 'react-loader-spinner';
import './style.css';

const ButtonInlineSmall = (props) => {
  const { label, handleOnClick, isLoading, handleType, handleStyle } = props;

  if (isLoading) {
    return <div className="btnSmall btnInline"><Loader type="TailSpin" color="#fff" height={20} width={20} /></div>;
  } else {
    return <button className="btnSmall btnInline" style={handleStyle} onClick={handleOnClick} type={handleType}>{label}</button>;
  }
}

export default ButtonInlineSmall;