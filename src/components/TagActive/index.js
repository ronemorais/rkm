import React from 'react';
import './style.css';

function TagActive(props) {

  const {label, active } = props;

  if(label){
    return <p className={`tag ${active ? 'tagActive' : 'tagInactive'}`}>{label}</p>
  }else{
    return <p className={`bullet ${active ? 'tagActive' : 'tagInactive'}`}>{label}</p>
  }

  
}

export default TagActive;