import React from 'react';
import  './style.css';

const Avatar = (props) => {
  const {name, image, size, icon, handleClass} = props;

  if(!!icon && !image && !name){
    return <div className={`avatarIniciais ${handleClass}`} style={{width: size, height: size}}><span uk-icon={icon}></span></div>
  }

  if(image){
    return <div className={`avatar ${handleClass}`} style={{backgroundImage: `url(${image})`, width: size, height: size}}></div>
  }else{
    return <div className={`avatarIniciais ${handleClass}`} style={{width: size, height: size}}>{name?.substr(0,1)}</div>
  }
}

export default Avatar;  