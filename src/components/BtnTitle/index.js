import React from 'react';

import './style.css';

// Icons from UIKit

function BtnTitle(props) {
    const {label, iconName, handleOnClick} = props;
  return (
        <div className="areaBtnTitle">
            <button className="btnTitle" onClick={handleOnClick}><i  uk-icon={iconName}></i><span>{label}</span></button>
        </div>
  );
}

export default BtnTitle;