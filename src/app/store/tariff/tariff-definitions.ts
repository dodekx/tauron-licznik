export enum Tariff {
  G11 = 'G11',
  G12 = 'G12',
  G12W = 'G12W',
  G13 = 'G13',
}

export enum TariffZone {
  Day = 'Day',
  Night = 'Night',
  Peak = 'Peak',
}

export interface Price {
  distribution: number;
  electricityPrice: number;
  total: number;
}

interface IPeriod {
  start: number;
  end: number;
  TariffZone: TariffZone;
  days?: number[];
  months?: number[];
}

type PeriodBase = IPeriod & { days?: number[]; months?: number[] };

export type Period =
  | (PeriodBase & { months?: never })
  | (PeriodBase & { months: number[]; days: number[] });

export type TariffTimeSet =
  | {
      name: Tariff.G11;
      defaultTariffZone: TariffZone.Day;
    }
  | {
      name: Tariff.G12 | Tariff.G12W | Tariff.G13;
      defaultTariffZone: TariffZone.Night;
      periods: Period[];
    };



export interface TariffRatesBase<T extends Tariff, Z extends TariffZone> {
  tariff: T;
  zones: {
    [key in Z]: Price;
  };
}

export interface TariffEnergyAmountData {
  amount: Partial<Record<TariffZone, number>> & { [TariffZone.Day]: number };
  totalAmount: number;
}

export interface Zone<T extends Tariff, Z extends TariffZone> {
    tariff: T;
    zones: Z;
}

// Refaktoryzacja typów TariffRatesBase
export type TariffG11Rates = TariffRatesBase<Tariff.G11, TariffZone.Day>;

export type TariffG12Rates = TariffRatesBase<Tariff.G12, TariffZone.Day | TariffZone.Night>;

export type TariffG12WRates = TariffRatesBase<Tariff.G12W, TariffZone.Day | TariffZone.Night>;

export type TariffG13Rates = TariffRatesBase<Tariff.G13, TariffZone.Day | TariffZone.Night | TariffZone.Peak>;

// Refaktoryzacja typu TariffRates
export type TariffRates =
    | TariffG11Rates
    | TariffG12Rates
    | TariffG12WRates
    | TariffG13Rates;
