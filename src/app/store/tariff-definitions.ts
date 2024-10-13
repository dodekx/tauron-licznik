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
export enum WeekDay {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export enum Month {
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12,
}

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
export interface G11Zone extends Zone<Tariff.G11, TariffZone.Day> {
  zones: TariffZone.Day;
}
export interface G12Zone
  extends Zone<Tariff.G12, TariffZone.Day | TariffZone.Night> {
  zones: TariffZone.Day | TariffZone.Night;
}
export interface G12WZone
  extends Zone<Tariff.G12W, TariffZone.Day | TariffZone.Night> {
  zones: TariffZone.Day | TariffZone.Night;
}
export interface G13Zone
  extends Zone<
    Tariff.G13,
    TariffZone.Day | TariffZone.Night | TariffZone.Peak
  > {
  zones: TariffZone.Day | TariffZone.Night | TariffZone.Peak;
}

export type TariffG11Rates = TariffRatesBase<Tariff.G11, G11Zone['zones']>;
export type TariffG12Rates = TariffRatesBase<Tariff.G12, G12Zone['zones']>;
export type TariffG12WRates = TariffRatesBase<Tariff.G12W, G12WZone['zones']>;
export type TariffG13Rates = TariffRatesBase<Tariff.G13, G13Zone['zones']>;

export type TariffRates =
  | TariffG11Rates
  | TariffG12Rates
  | TariffG12WRates
  | TariffG13Rates;
