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