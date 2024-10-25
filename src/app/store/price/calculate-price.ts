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
} from '../tariff/tariff-definitions';
import { EnergyDataRow } from '../../types/energy-data-record';
import {
  calculateG12TariffZone,
  calculateG12WTariffZone,
  calculateG13TariffZone,
} from './calculate-tariff-energy-amount';

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




export function calculatePriceWithinDifferentTariffs({
  date,value
}: EnergyDataRow): EnergyPricesInDifferentTariffs {
  return {
    [Tariff.G11]: parseFloat((value * getTarriffPrice(date, Tariff.G11)).toFixed(4)),
    [Tariff.G12]: parseFloat((value * getTarriffPrice(date, Tariff.G12)).toFixed(4)),
    [Tariff.G12W]: parseFloat((value * getTarriffPrice(date, Tariff.G12W)).toFixed(4)),
    [Tariff.G13]: parseFloat((value * getTarriffPrice(date, Tariff.G13)).toFixed(4)),
  };
}

function getTarriffPrice(date: Date, tariff: Tariff): number {
  switch (tariff) {
    case Tariff.G11:
      return TariffG11Price.zones.Day.total;
    case Tariff.G12: {
      return TariffG12Price.zones[
        calculateG12TariffZone(date) as TariffZone.Day | TariffZone.Night
      ].total;
    }
    case Tariff.G12W:
      return TariffG12WPrice.zones[
        calculateG12WTariffZone(date) as TariffZone.Day | TariffZone.Night
      ].total;
    case Tariff.G13:
      return TariffG13Price.zones[calculateG13TariffZone(date)].total;
    default:
      return 0;
  }
}
export interface EnergyPricesInDifferentTariffs {
  [Tariff.G11]: number;
  [Tariff.G12]: number;
  [Tariff.G12W]: number;
  [Tariff.G13]: number;
}
