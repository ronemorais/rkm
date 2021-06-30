import React from 'react';
import './style.css';

function Status(props) {

  const {completed, canceled } = props;

  if(!completed && !canceled){
    return <span className="uk-label status statusInProgress">Em andamento</span>
  }
  if(completed){
    return <span className="uk-label status statusComplete">Venda finalizada</span>
  }

  if(canceled){
    return <span className="uk-label status statusCanceled">Cancelado</span>
  }
  
}

export default Status;