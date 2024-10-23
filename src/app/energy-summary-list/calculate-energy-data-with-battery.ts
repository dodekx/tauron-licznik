import { Battery } from '../types/battery';
import { EnergyDataRow } from '../types/energy-data-record';
import {
  calculatePrice,
  TariffG11Price,
  TariffG12Price,
  TariffG12WPrice,
  TariffG13Price,
} from '../store/price/calculate-price';
import {
  calculateG11TariffEnergyAmount,
  calculateG11TariffEnergyProductionAmount,
  calculateG12TariffEnergyAmount,
  calculateG12TariffEnergyProductionAmount,
  calculateG12WTariffEnergyAmount,
  calculateG12WTariffEnergyProductionAmount,
  calculateG13TariffEnergyAmount,
  calculateG13TariffEnergyProductionAmount,
} from '../store/price/calculate-tariff-energy-amount';
import {
  TariffEnergyAmountData,
  TariffZone,
} from '../store/tariff/tariff-definitions';
import { ProsumerType } from '../store/energy-data-store/prosument-type.enum';
import { getRCEmMonthlyPrice } from './net-billing-monthly-price-const';
import { adjustNetMeteringAmounts } from './adjust-net-metering-amounts';

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

export function energySummaryDecorator(
  energyData: EnergyDataRow[],
  battery: Battery,
  prosumentType: ProsumerType = ProsumerType.netMetering70
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

  let calculatedG11ProductionAmount: TariffEnergyAmountData = {
    amount: { [TariffZone.Day]: 0 },
    totalAmount: 0,
  };
  let calculatedG12ProductionAmount: TariffEnergyAmountData = {
    amount: { [TariffZone.Day]: 0, [TariffZone.Night]: 0 },
    totalAmount: 0,
  };
  let calculatedG12WProductionAmount: TariffEnergyAmountData = {
    amount: { [TariffZone.Day]: 0, [TariffZone.Night]: 0 },
    totalAmount: 0,
  };
  let calculatedG13ProductionAmount: TariffEnergyAmountData = {
    amount: {
      [TariffZone.Day]: 0,
      [TariffZone.Night]: 0,
      [TariffZone.Peak]: 0,
    },
    totalAmount: 0,
  };

  let netBillingMonthly = 0;

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

      const toGridAmount = availableEnergy - energyToStore;
      fedIntoGrid += toGridAmount;

      netBillingMonthly +=
        getRCEmMonthlyPrice(record.date.getFullYear(), record.date.getMonth()) *
        toGridAmount;

      calculatedG11ProductionAmount = calculateG11TariffEnergyProductionAmount(
        calculatedG11ProductionAmount,
        toGridAmount,
        record.date
      );

      calculatedG12ProductionAmount = calculateG12TariffEnergyProductionAmount(
        calculatedG12ProductionAmount,
        toGridAmount,
        record.date
      );

      calculatedG12WProductionAmount =
        calculateG12WTariffEnergyProductionAmount(
          calculatedG12WProductionAmount,
          toGridAmount,
          record.date
        );

      calculatedG13ProductionAmount = calculateG13TariffEnergyProductionAmount(
        calculatedG13ProductionAmount,
        toGridAmount,
        record.date
      );
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

  if (
    ProsumerType.netMetering70 === prosumentType ||
    ProsumerType.netMetering80 === prosumentType
  ) {
    const correctedG11 = adjustNetMeteringAmounts(
      calculatedG11Amount,
      calculatedG11ProductionAmount,
      prosumentType
    );

    const correctedG12 = adjustNetMeteringAmounts(
      calculatedG12Amount,
      calculatedG12ProductionAmount,
      prosumentType
    );
    const correctedG12W = adjustNetMeteringAmounts(
      calculatedG12WAmount,
      calculatedG12WProductionAmount,
      prosumentType
    );
    const correctedG13 = adjustNetMeteringAmounts(
      calculatedG13Amount,
      calculatedG13ProductionAmount,
      prosumentType
    );
    return {
      selfConsumption,
      fedIntoGrid,
      priceG11: {
        ...calculatedG11Amount,
        totalPrice: calculatePrice({ ...correctedG11 }, TariffG11Price),
      },
      priceG12: {
        ...calculatedG12Amount,
        totalPrice: calculatePrice({ ...correctedG12 }, TariffG12Price),
      },
      priceG12W: {
        ...calculatedG12WAmount,
        totalPrice: calculatePrice({ ...correctedG12W }, TariffG12WPrice),
      },
      priceG13: {
        ...calculatedG13Amount,
        totalPrice: calculatePrice({ ...correctedG13 }, TariffG13Price),
      },
    };
  }

  return {
    selfConsumption,
    fedIntoGrid,
    priceG11: {
      ...calculatedG11Amount,
      totalPrice: Math.max(
        calculatePrice({ ...calculatedG11Amount }, TariffG11Price) -
          netBillingMonthly,
        0
      ),
    },
    priceG12: {
      ...calculatedG12Amount,
      totalPrice: Math.max(
        calculatePrice({ ...calculatedG12Amount }, TariffG12Price) -
          netBillingMonthly,
        0
      ),
    },
    priceG12W: {
      ...calculatedG12WAmount,
      totalPrice: Math.max(
        calculatePrice({ ...calculatedG12WAmount }, TariffG12WPrice) -
          netBillingMonthly,
        0
      ),
    },
    priceG13: {
      ...calculatedG13Amount,
      totalPrice: Math.max(
        calculatePrice({ ...calculatedG13Amount }, TariffG13Price) -
          netBillingMonthly,
        0
      ),
    },
  };
}
