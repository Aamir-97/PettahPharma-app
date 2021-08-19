import React from 'react'
import { formatNumber } from 'react-native-currency-input';
import CurrencyInput from 'react-native-currency-input';

export function Currencyinput() {
  const [value, setValue] = React.useState(0.00); 

  return (
    <CurrencyInput value={value} onChangeValue={setValue} 
        unit="Rs." delimiter="," separator="." precision={2}
        onChangeText={(formattedValue) => { console.log(formattedValue); 
      }}
    />
  );
}

const value = -2375923.3;
const formattedValue = formatNumber(value, {
    separator: ',',
    unit: 'Rs ',
    precision: 2,
    delimiter: '.',
    ignoreNegative: true,
  });
  
  console.log(formattedValue);