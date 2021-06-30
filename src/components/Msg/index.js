import React from 'react';
import './style.css';

const Msg = (props) => {
  const { message, type } = props;

  return (
    <div className={`msg msg-${type} animated fadeIn`}>{message || ''}</div>
  );
}

export default Msg;