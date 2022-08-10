export type StackParamList = {
  Home: undefined;
  Calculate: undefined;
  Settings: undefined;
  Information: undefined;
}

export class Device {
  constructor(
    public id: string,
    public name: string,
    public iconName: string,
    public watt: number,
    public count: number,
    public dailyHours: number,
    public weeklyDays: number,
    public amounts: TotalAmount
  ) {}
}

export class TotalAmount {
  constructor(
    public day: number,
    public week: number,
    public month: number,
    public year: number
  ) {}
}

export class DeviceListCalculateResult {
  constructor(
    public totalKWMonth: number,
    public totalAmountMonth: number,
    public totalKWYear: number,
    public totalAmountYear: number,
  ) {}
}

export class Preferences {
  constructor(
    public currencySymbol: string,
    public currencyName: string,
    public currencyLeft: boolean,
    public price: number,
    public language: string,
    public changePreferences: Function,
  ) {}
}