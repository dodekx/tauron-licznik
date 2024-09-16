import { Battery, EnergyDataRecord } from '../types/data-record';
import {
  calculateG11Price,
  calculateG12Price,
  calculateG12WPrice,
  calculateG13Price,
} from './calculate-price';

export function calculateEnergyDataWithBattery(
  energyData: EnergyDataRecord[],
  battery: Battery
): EnergyData {
  let batteryCharge = 0; // aktualny stan naładowania baterii w kWh
  let selfConsumption = 0; // autokonsumpcja w kWh
  let consumption = 0;
  let fedIntoGrid = 0;
  let priceG11 = 0;
  let priceG12 = 0;
  let priceG12W = 0;
  let priceG13 = 0;

  for (const record of energyData) {
    if (record.value === 0) {
      continue;
    }

    if (record.value > 0) {
      const availableEnergy = record.value;
      const energyToStore = Math.min(
        availableEnergy * (battery.efficiency / 100),
        battery.capacity - batteryCharge
      );
      batteryCharge += energyToStore;
      fedIntoGrid += availableEnergy - energyToStore;
    } else {
      const energyNeeded = Math.abs(record.value);
      const availableEnergy = batteryCharge * (battery.efficiency / 100);

      if (availableEnergy < energyNeeded) {
        batteryCharge = 0;
        selfConsumption += availableEnergy;
        consumption += energyNeeded - availableEnergy;
        priceG11 += -calculateG11Price(record);
        priceG12 += -calculateG12Price(record);
        priceG12W += -calculateG12WPrice(record);
        priceG13 += -calculateG13Price(record);
      } else {
        batteryCharge -= (energyNeeded * 100) / battery.efficiency;
        selfConsumption += energyNeeded;
      }
    }
  }
  return {
    selfConsumption,
    consumption,
    fedIntoGrid,
    priceG11,
    priceG12,
    priceG12W,
    priceG13,
  };
}

export interface EnergyData {
  selfConsumption: number; // autokonsumcja
  consumption: number; // zużycie
  fedIntoGrid: number; // oddano do sieci
  priceG11: number; // cena prądu w taryfie g11
  priceG12: number; // cena prądu w taryfie g12
  priceG12W: number; // cena prądu w taryfie g12W
  priceG13: number; // cena prądu w taryfie g13
}
