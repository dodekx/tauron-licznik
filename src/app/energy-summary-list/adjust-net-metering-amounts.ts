import { ProsumerType } from '../store/energy-data-store/prosument-type.enum';
import {
  TariffEnergyAmountData,
  TariffZone,
} from '../store/tariff/tariff-definitions';

export function adjustNetMeteringAmounts(
  ussed: TariffEnergyAmountData,
  prodused: TariffEnergyAmountData,
  prosumentType: ProsumerType
): TariffEnergyAmountData {
  let multiplayer = 0.8;
  switch (prosumentType) {
    case ProsumerType.netBillingMonthly:
    case ProsumerType.netBillingHourly:
      return ussed;
    case ProsumerType.netMetering70:
      multiplayer = 0.7;
      break;
  }

  const correctedAmount = {
    amount: {
      [TariffZone.Day]: 0,
      [TariffZone.Night]: 0,
      [TariffZone.Peak]: 0,
    },
    totalAmount: 0,
  };

  if (ussed.totalAmount <= prodused.totalAmount * multiplayer) {
    return correctedAmount;
  }

  Object.keys(correctedAmount.amount).forEach((key) => {
    if (key in ussed.amount || key in prodused.amount) {
      correctedAmount.amount[key as TariffZone] =
        (ussed.amount[key as TariffZone] ?? 0) -
        (prodused.amount[key as TariffZone] ?? 0) * multiplayer;
      correctedAmount.totalAmount +=
        correctedAmount.amount[key as TariffZone] ?? 0;
    }
  });

  if (correctedAmount.amount[TariffZone.Day] < 0) {
    if (correctedAmount.amount.Night > 0) {
      const correction = Math.abs(
        (correctedAmount.amount.Night *
          correctedAmount.amount[TariffZone.Day]) /
          correctedAmount.totalAmount
      );
      correctedAmount.amount[TariffZone.Day] += correction;
      correctedAmount.amount.Night -= correction;
    }
    if (correctedAmount.amount.Peak > 0) {
      const correction = Math.abs(
        (correctedAmount.amount.Peak * correctedAmount.amount[TariffZone.Day]) /
          correctedAmount.totalAmount
      );
      correctedAmount.amount[TariffZone.Day] += correction;
      correctedAmount.amount.Peak -= correction;
    }
  }

  if (correctedAmount.amount[TariffZone.Night] < 0) {
    if (correctedAmount.amount.Day > 0) {
      const correction = Math.abs(
        (correctedAmount.amount.Day *
          correctedAmount.amount[TariffZone.Night]) /
          correctedAmount.totalAmount
      );
      correctedAmount.amount[TariffZone.Night] += correction;
      correctedAmount.amount.Day -= correction;
    }
    if (correctedAmount.amount.Peak > 0) {
      const correction = Math.abs(
        (correctedAmount.amount.Peak *
          correctedAmount.amount[TariffZone.Night]) /
          correctedAmount.totalAmount
      );
      correctedAmount.amount[TariffZone.Night] += correction;
      correctedAmount.amount.Peak -= correction;
    }
  }

  if (correctedAmount.amount[TariffZone.Peak] < 0) {
    if (correctedAmount.amount.Day > 0) {
      const correction = Math.abs(
        (correctedAmount.amount.Day * correctedAmount.amount[TariffZone.Peak]) /
          correctedAmount.totalAmount
      );
      correctedAmount.amount[TariffZone.Peak] += correction;
      correctedAmount.amount.Day -= correction;
    }
    if (correctedAmount.amount.Night > 0) {
      const correction = Math.abs(
        (correctedAmount.amount.Night *
          correctedAmount.amount[TariffZone.Peak]) /
          correctedAmount.totalAmount
      );
      correctedAmount.amount[TariffZone.Peak] += correction;
      correctedAmount.amount.Night -= correction;
    }
  }

  return correctedAmount;
}
