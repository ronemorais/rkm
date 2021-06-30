import React from 'react';
import Loader from 'react-loader-spinner';

import './style.css';

function Loading() {
  return (
    <div className="areaLoading animated fadeIn">
      <Loader type="TailSpin" color="#C4A07C" height={40} width={40}/>
      <small>carregando...</small>
    </div>
  );
}

export default Loading;