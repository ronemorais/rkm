import React from 'react';
import Loader from 'react-loader-spinner';
import './style.css';

const Button = (props) => {
  const {label, handleOnClick, isLoading, handleType} = props;

  if(isLoading){
    return <div className="btn"><Loader type="TailSpin" color="#fff" height={20} width={20}/></div>;
  }else{
    return <button className="btn" onClick={handleOnClick} type={handleType}>{label}</button>;
  }
}

export default Button;