import { Device } from "./types";

export const deviceList : Device[] = [
  {
    id: '123',
    name: 'Television',
    iconName: 'television',
    watt: 50,
    count: 1,
    dailyHours: 10,
    weeklyDays: 7,
    amounts: {
      day: 1,
      week: 2,
      month: 3,
      year: 4
    }
  },
  {
    id: '234',
    name: 'Fridge',
    iconName: 'fridge',
    watt: 44,
    count: 1,
    dailyHours: 24,
    weeklyDays: 7,
    amounts: {
      day: 1,
      week: 2,
      month: 3,
      year: 4
    }
  },
  {
    id: '112',
    name: 'Cell Phone',
    iconName: 'phone',
    watt: 4,
    count: 5,
    dailyHours: 1,
    weeklyDays: 7,
    amounts: {
      day: 1,
      week: 2,
      month: 3,
      year: 4
    }
  }
];

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
]