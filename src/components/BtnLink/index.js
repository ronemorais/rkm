import React from 'react';

import './style.css';

function BtnLink(props) {
    const {label, handleOnClick} = props;
    return <button className="btnLink" onClick={handleOnClick}>{label}</button>;
}

export default BtnLink;