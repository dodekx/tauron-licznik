import { Battery } from '../types/battery';
import { EnergyDataRecord } from '../types/energy-data-record';
import {
  calculatePrice,
  TariffG11Price,
  TariffG12Price,
  TariffG12WPrice,
  TariffG13Price,
} from './calculate-price';
import {
  calculateG11TariffEnergyAmount,
  calculateG12TariffEnergyAmount,
  calculateG12WTariffEnergyAmount,
  calculateG13TariffEnergyAmount,
} from './calculate-tariff-energy-amount';
import {
  TariffEnergyAmountData,
  TariffZone,
} from './tariff-definitions';

interface TariffEnergyData extends TariffEnergyAmountData {
  totalPrice: number;
}
export interface EnergyData {
  selfConsumption: number;
  fedIntoGrid: number;
  priceG11: TariffEnergyData;
  priceG12: TariffEnergyData;
  priceG12W: TariffEnergyData;
  priceG13: TariffEnergyData;
}

export function calculateEnergyDataWithBattery(
  energyData: EnergyDataRecord[],
  battery: Battery
): EnergyData {
  let batteryCharge = 0; // aktualny stan naładowania baterii w kWh
  let selfConsumption = 0; // autokonsumpcja w kWh
  let fedIntoGrid = 0;
  let calculatedG11Amount: TariffEnergyAmountData = {
    amount: { [TariffZone.Day]: 0 },
    totalAmount: 0,
  };
  let calculatedG12Amount: TariffEnergyAmountData = {
    amount: { [TariffZone.Day]: 0, [TariffZone.Night]: 0 },
    totalAmount: 0,
  };
  let calculatedG12WAmount: TariffEnergyAmountData = {
    amount: { [TariffZone.Day]: 0, [TariffZone.Night]: 0 },
    totalAmount: 0,
  };
  let calculatedG13Amount: TariffEnergyAmountData = {
    amount: {
      [TariffZone.Day]: 0,
      [TariffZone.Night]: 0,
      [TariffZone.Peak]: 0,
    },
    totalAmount: 0,
  };

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
        calculatedG11Amount = calculateG11TariffEnergyAmount(
          calculatedG11Amount,
          record
        );
        calculatedG12Amount = calculateG12TariffEnergyAmount(
          calculatedG12Amount,
          record
        );
        calculatedG12WAmount = calculateG12WTariffEnergyAmount(
          calculatedG12WAmount,
          record
        );
        calculatedG13Amount = calculateG13TariffEnergyAmount(
          calculatedG13Amount,
          record
        );
      } else {
        batteryCharge -= (energyNeeded * 100) / battery.efficiency;
        selfConsumption += energyNeeded;
      }
    }
  }

  return {
    selfConsumption,
    fedIntoGrid,
    priceG11: {
      ...calculatedG11Amount,
      totalPrice: calculatePrice({ ...calculatedG11Amount }, TariffG11Price),
    },
    priceG12: {
      ...calculatedG12Amount,
      totalPrice: calculatePrice({ ...calculatedG12Amount }, TariffG12Price),
    },
    priceG12W: {
      ...calculatedG12WAmount,
      totalPrice: calculatePrice({ ...calculatedG12WAmount }, TariffG12WPrice),
    },
    priceG13: {
      ...calculatedG13Amount,
      totalPrice: calculatePrice({ ...calculatedG13Amount }, TariffG13Price),
    },
  };
}
