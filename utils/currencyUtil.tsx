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
  symbol: string;
  decimalPlaces: number;
  decimalSeparator: string;
  thousandsSeparator: string;
};

const currencies: Record<string, CurrencyDef> = {
  'clp': {
    symbol: '$',
    decimalPlaces: 1,
    decimalSeparator: ',',
    thousandsSeparator: '.',
  },
  'eur': {
    symbol: '€',
    decimalPlaces: 2,
    decimalSeparator: '.',
    thousandsSeparator: ',',
  },
  'usd': {
    symbol: '€',
    decimalPlaces: 2,
    decimalSeparator: '.',
    thousandsSeparator: ',',
  }
};


export function formatMask(
  value: string,
  currencyCode: string = 'clp',
  returnNumber: boolean = false
): string | number {
  const currencyData = currencies[currencyCode];
  
  // Remove all characters except numbers and the decimal separators
  let regexRemove = new RegExp(`[^0-9${currencyData.decimalSeparator}]`, 'g');
  if(currencyData.decimalPlaces === 0){
    regexRemove = new RegExp(`[^0-9]`, 'g');  
  }
  let cleanValue = value.replace(regexRemove, '');

  // Find the last comma position
  const lastCommaIndex = cleanValue.lastIndexOf(currencyData.decimalSeparator);
  
  const regexLastDecimalSeparator = new RegExp(`\\${currencyData.decimalSeparator}`, 'g');
  // If there is a decimal separator, remove all others
  let beforeLastComma = cleanValue.substring(0, lastCommaIndex).replace(regexLastDecimalSeparator, '');
  let afterLastComma = cleanValue.substring(lastCommaIndex);

  if (lastCommaIndex == -1) {
    beforeLastComma = afterLastComma
    afterLastComma = '';
  }

  // Remove leading zeros from the integer part
  beforeLastComma = beforeLastComma.replace(/^0+/, '');
  // Keep the last zero if the integer part becomempty and there is a decimal part (attempt)
  if(lastCommaIndex !== -1 && beforeLastComma===''){
    beforeLastComma = '0';
  }

  cleanValue = beforeLastComma + afterLastComma;

  // Set the decimal separator to '.' which is the default for numeric values
  cleanValue = cleanValue.replace(new RegExp(`\\${currencyData.decimalSeparator}`, 'g'), '.');

  // Fallback to '0' if the string is empty after cleaning
  if(cleanValue==='') {
    cleanValue = '0';
  }
  if(returnNumber){
    console.log(Number(cleanValue))
  }
  return returnNumber ? Number(cleanValue) : cleanValue;
}

export function formatDisplay(value: string, currencyCode: string = 'clp'): string {
  const currencyData = currencies[currencyCode];
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

  // Truncate decimal part to maximum 2 characters
  if(decimalPart.length > currencyData.decimalPlaces){
    decimalPart = decimalPart.substring(0, currencyData.decimalPlaces);
  }

  // Add thousands separators to the integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, currencyData.thousandsSeparator);

  // Combine with decimal part if it exists
  if (lastCommaIndex !== -1 && currencyData.decimalPlaces > 0) {
    value = `${currencyData.symbol}${formattedInteger}${currencyData.decimalSeparator}${decimalPart}`;
  } else {
    value = `${currencyData.symbol}${formattedInteger}`;
  }
  return value;
}