import { Preferences } from "./types";

export const iconList = [
  "cog",
  "phone",
  "fridge",
  "monitor",
  "desktop-tower",
  "lightbulb",
  "air-humidifier",
  "air-conditioner",
  "battery-medium",
  "blender",
  "cctv",
  "ceiling-light",
  "ceiling-fan",
  "cellphone",
  "coffee-maker",
  "controller-classic",
  "desk-lamp"
];

export const languageList = [
  { symbol: 'en-US', name: 'English' },
  { symbol: 'es-ES', name: 'Español' },
  { symbol: 'fr-FR', name: 'Français' },
  { symbol: 'pt-PT', name: 'Português' },
  { symbol: 'de-DE', name: 'Deutsch' },
  { symbol: 'tr-TR', name: 'Türkçe' },
  { symbol: 'zh-CN', name: '中國人' },
  { symbol: 'ja-JP', name: '日本' },
  { symbol: 'ko-KR', name: '한국인' },
  { symbol: 'ar-SA', name: 'عربي' },
];

export const currencySymbolList = [
  { name: 'Dollar', symbol: "$", left: true },
  { name: 'Euro', symbol: "€", left: true },
  { name: 'Pound', symbol: "£", left: true },
  { name: 'Türk Lirası', symbol: "₺", left: false },
  { name: 'Franc', symbol: "fr.", left: true },
  { name: 'Yen', symbol: "¥", left: true },
  { name: 'Won', symbol: "₩", left: true },
  { name: 'Rupee', symbol: "₹", left: true },
  { name: 'Ruble', symbol: "p.", left: false },
  { name: 'Riyal', symbol: "﷼", left: false }
]

export const enDefaultValues: Preferences = {
  currencySymbol: '$',
  currencyName: 'Dollar',
  currencyLeft: true,
  price: 1,
  language: 'en-US',
  changePreferences: () => {}
}

export const trDefaultValues: Preferences = {
  currencySymbol: '₺',
  currencyName: 'Türk Lirası',
  currencyLeft: false,
  price: 1,
  language: 'tr-TR',
  changePreferences: () => {}
}

export const deDefaultValues: Preferences = {
  currencySymbol: '€',
  currencyName: 'Euro',
  currencyLeft: true,
  price: 1,
  language: 'de-DE',
  changePreferences: () => {}
}

export const arDefaultValues: Preferences = {
  currencySymbol: '﷼',
  currencyName: 'Riyal',
  currencyLeft: false,
  price: 1,
  language: 'ar-SA',
  changePreferences: () => {}
}

export const esDefaultValues: Preferences = {
  currencySymbol: '€',
  currencyName: 'Euro',
  currencyLeft: true,
  price: 1,
  language: 'es-ES',
  changePreferences: () => {}
}

export const frDefaultValues: Preferences = {
  currencySymbol: '€',
  currencyName: 'Euro',
  currencyLeft: true,
  price: 1,
  language: 'fr-FR',
  changePreferences: () => {}
}

export const jaDefaultValues: Preferences = {
  currencySymbol: '¥',
  currencyName: 'Yen',
  currencyLeft: true,
  price: 1,
  language: 'ja-JP',
  changePreferences: () => {}
}

export const koDefaultValues: Preferences = {
  currencySymbol: '₩',
  currencyName: 'Won',
  currencyLeft: true,
  price: 1,
  language: 'ko-KR',
  changePreferences: () => {}
}

export const ptDefaultValues: Preferences = {
  currencySymbol: '€',
  currencyName: 'Euro',
  currencyLeft: true,
  price: 1,
  language: 'pt-PT',
  changePreferences: () => {}
}

export const zhDefaultValues: Preferences = {
  currencySymbol: '$',
  currencyName: 'Dollar',
  currencyLeft: true,
  price: 1,
  language: 'zh-CN',
  changePreferences: () => {}
}