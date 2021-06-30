import React from 'react';
import IntlCurrencyInput from "react-intl-currency-input"
import './style.css';

const FieldsetMoney = (props) => {

  const { label, handleValue, handleOnChange } = props;

  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

  return (
    <div className="fieldset">
      <label>{label}</label>
      <IntlCurrencyInput
        currency="BRL"
        config={currencyConfig}
        onChange={handleOnChange}
        value={handleValue}
        className="campos"
      />
    </div>
  );
}

export default FieldsetMoney;