import React from 'react';
import AutoComplete from 'react-google-autocomplete';
import './style.css';

const Address = (props) => {
  const {label, handleValue, placeholder} = props;
  return (
        <div className="fieldset">
            <label>{label}</label>
            <AutoComplete 
              className="campos" 
              apiKey={"AIzaSyAwLh9HBY2uCKQV2IkNN7j3zJRS6nMU5Qc"} 
              onPlaceSelected={handleValue || ''} 
              types={['address']} 
              componentRestrictions={{country: "br"}} 
              placeholder={placeholder}
              />
        </div>
  );
}

export default Address;