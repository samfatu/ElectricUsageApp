import { Device, DeviceListCalculateResult, TotalAmount } from "../types";

export const calculateDevice = (device: Device, price: number) : TotalAmount => {
  let kWh = device.watt / 1000 * price;

  let dkWh = device.count * device.dailyHours * kWh;
  let wkWh = dkWh * 7;
  let mkWh = dkWh * 30;
  let ykWh = dkWh * 365;

  let amounts = new TotalAmount(
    Number(dkWh.toFixed(2)),
    Number(wkWh.toFixed(2)),
    Number(mkWh.toFixed(2)),
    Number(ykWh.toFixed(2))
  );
  return amounts;
}

export const calculateTotal = (deviceList: Device[]) : DeviceListCalculateResult => {
  let kwMonth = 0;
  let amountMonth = 0;
  let kwYear = 0;
  let amountYear = 0;

  deviceList.forEach((device) => {
    kwMonth += device.count * (device.watt / 1000) * device.dailyHours * device.weeklyDays;
    amountMonth += device.amounts.month;
    kwYear += device.count * (device.watt / 1000) * device.dailyHours * device.weeklyDays * 12;
    amountYear += device.amounts.year;
  })

  let result = new DeviceListCalculateResult(
    Number(kwMonth.toFixed(2)),
    Number(amountMonth.toFixed(2)),
    Number(kwYear.toFixed(2)),
    Number(amountYear.toFixed(2))
  );

  return result;
}