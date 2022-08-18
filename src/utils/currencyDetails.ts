import { currencySymbolList } from "../constants";


export const getCurrencySymbol = (currencyName: string) : string => {
  const currency = currencySymbolList.find(currency => currency.name === currencyName);

  return currency?.symbol ? currency.symbol : '';
}

export const getIsCurrencyLeft = (currencyName: string): boolean => {
  const currency = currencySymbolList.find(currency => currency.name === currencyName);

  return currency?.left ? currency.left : false;
}