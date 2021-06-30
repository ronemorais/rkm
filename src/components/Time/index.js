import React from 'react'

export const Time = (props) => {

    const {seconds} = props;
    if(!seconds){
        return null
    }
    var time = new Date(null);
    time.setSeconds(seconds);
    var timeFormated = time.toISOString().substr(11, 8);

    return <span>{timeFormated}</span>
}
