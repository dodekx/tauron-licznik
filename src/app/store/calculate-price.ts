import {} from './tariffe-time-set';
import {
  TariffZone,
  Tariff,
  Price,
  TariffRates,
  TariffG11Rates,
  TariffG12Rates,
  TariffG12WRates,
  TariffG13Rates,
  TariffEnergyAmountData,
} from './tariff-definitions';

export const priceFactory = (
  distribution: number,
  electricityPrice: number
): Price => {
  return {
    distribution,
    electricityPrice,
    total: distribution + electricityPrice,
  };
};

export const TariffG11Price: TariffG11Rates = {
  tariff: Tariff.G11,
  zones: {
    [TariffZone.Day]: priceFactory(0.627, 0.2573),
  },
};

export const TariffG12Price: TariffG12Rates = {
  tariff: Tariff.G12,
  zones: {
    [TariffZone.Day]: priceFactory(0.627, 0.2934),
    [TariffZone.Night]: priceFactory(0.462, 0.0618),
  },
};

export const TariffG12WPrice: TariffG12WRates = {
  tariff: Tariff.G12W,
  zones: {
    [TariffZone.Day]: priceFactory(0.844, 0.3314),
    [TariffZone.Night]: priceFactory(0.462, 0.0527),
  },
};

export const TariffG13Price: TariffG13Rates = {
  tariff: Tariff.G13,
  zones: {
    [TariffZone.Day]: priceFactory(0.67, 0.1922),
    [TariffZone.Peak]: priceFactory(0.956, 0.3401),
    [TariffZone.Night]: priceFactory(0.514, 0.0356),
  },
};

export function calculatePrice(
  ammount: TariffEnergyAmountData,
  tariff: TariffRates
): number {
  let price = 0;

  if (TariffZone.Peak in ammount.amount && TariffZone.Peak in tariff.zones) {
    price += (ammount.amount.Peak ?? 0) * tariff.zones.Peak.total;
  }

  if (TariffZone.Night in ammount.amount && TariffZone.Night in tariff.zones) {
    price += (ammount.amount.Night ?? 0) * tariff.zones.Night.total;
  }

  if (TariffZone.Day in ammount.amount && TariffZone.Day in tariff.zones) {
    price += ammount.amount.Day * tariff.zones.Day.total;
  }

  return Math.round(price * 100) / 100;
}
