export const currencyOptions = [
  { label: 'Chilean Peso (CLP)', value: 'clp', extraInfo: {inputLabel: 'CLP', flagImage: 'https://flagsapi.com/CL/flat/64.png'}},
  { label: 'US Dollar (USD)', value: 'usd', extraInfo: { inputLabel: 'USD', flagImage: 'https://flagsapi.com/US/flat/64.png' } },
  { label: 'Japanese Yen (JPY)', value: 'jpy', extraInfo: { inputLabel: 'JPY', flagImage: 'https://flagsapi.com/JP/flat/64.png' } },
  { label: 'British Pound (GBP)', value: 'gbp', extraInfo: { inputLabel: 'GBP', flagImage: 'https://flagsapi.com/GB/flat/64.png' } },
  { label: 'Australian Dollar (AUD)', value: 'aud', extraInfo: { inputLabel: 'AUD', flagImage: 'https://flagsapi.com/AU/flat/64.png' } },
  { label: 'Canadian Dollar (CAD)', value: 'cad', extraInfo: { inputLabel: 'CAD', flagImage: 'https://flagsapi.com/CA/flat/64.png' } },
  { label: 'Swiss Franc (CHF)', value: 'chf', extraInfo: { inputLabel: 'CHF', flagImage: 'https://flagsapi.com/CH/flat/64.png' } },
  { label: 'Chinese Yuan (CNY)', value: 'cny', extraInfo: { inputLabel: 'CNY', flagImage: 'https://flagsapi.com/CN/flat/64.png' } },
  { label: 'Swedish Krona (SEK)', value: 'sek', extraInfo: { inputLabel: 'SEK', flagImage: 'https://flagsapi.com/SE/flat/64.png' } },
]

type CurrencyDef = {
  code: string;
  symbol: string;
  decimalPlaces: number;
  decimalSeparator: string;
  thousandsSeparator: string;
};

const currencies: Record<string, CurrencyDef> = {
  'clp': {
    code: 'clp',
    symbol: '$',
    decimalPlaces: 1,
    decimalSeparator: ',',
    thousandsSeparator: '.',
  },
  'eur': {
    code: 'eur',
    symbol: '€',
    decimalPlaces: 2,
    decimalSeparator: '.',
    thousandsSeparator: ',',
  },
  'usd': {
    code: 'usd',
    symbol: '€',
    decimalPlaces: 2,
    decimalSeparator: '.',
    thousandsSeparator: ',',
  }
};


export function formatMask(value: string, currencyCode: string = 'clp'): string {
  const currencyData = currencies[currencyCode];
  
  // Remove all characters except numbers and the decimal separators
  const regexRemove = new RegExp(`[^0-9${currencyData.decimalSeparator}]`, 'g');
  let cleanValue = value.replace(regexRemove, '');
  console.log("formatMask", currencyCode)
  console.log("removed unwanted chars:", cleanValue);

  // Find the last comma position
  const lastCommaIndex = cleanValue.lastIndexOf(currencyData.decimalSeparator);
  
  if (lastCommaIndex !== -1) {
    // Remove all commas except the rightmost one
    const regexLastComma = new RegExp(`\\${currencyData.decimalSeparator}`, 'g');
    const beforeLastComma = cleanValue.substring(0, lastCommaIndex).replace(regexLastComma, '');
    const afterLastComma = cleanValue.substring(lastCommaIndex);
    cleanValue = beforeLastComma + afterLastComma;
  }

  // Set the decimal separator to '.' which is the default for numeric values
  cleanValue = cleanValue.replace(new RegExp(`\\${currencyData.decimalSeparator}`, 'g'), '.');

  console.log("final clean value:", cleanValue);
  return cleanValue;
}

export function formatDisplay(value: string, currencyCode: string = 'clp'): string {
  const currencyData = currencies[currencyCode];
  console.log("formatDisplay", currencyCode)
  // Check if the last char is a decimal separator
  const lastCommaIndex = value.lastIndexOf('.');

  if (!value) return '';

  // Split into integer and decimal parts
  const parts = value.split('.');
  const integerPart = parts[0];
  let decimalPart = parts[1];
  if(!decimalPart){
    decimalPart = '';
  }

  // Add thousands separators to the integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, currencyData.thousandsSeparator);

  // Combine with decimal part if it exists
  if (lastCommaIndex !== -1) {
    value = `${currencyData.symbol}${formattedInteger}${currencyData.decimalSeparator}${decimalPart}`;
  } else {
    value = `${currencyData.symbol}${formattedInteger}`;
  }
  return value;
}