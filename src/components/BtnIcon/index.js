import React from 'react';

import './style.css';

//Icons do UIkit

function BtnIcon(props) {

  const { icon, handleOnClick, size } = props;
  return (
      <div className="btnIcon" onClick={handleOnClick}>
          <span uk-icon={icon} width={size}></span>
      </div>
  );
}

export default BtnIcon;