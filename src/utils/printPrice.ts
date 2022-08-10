
export const printPrice = (number: Number, currencySymbol: string, currencyLeft: boolean) : string => {

  return currencyLeft ? `${currencySymbol} ${number}` : `${number} ${currencySymbol}`;
}