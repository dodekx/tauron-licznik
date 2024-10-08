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

export type TariffRates = {
  [key in Tariff]: Record<string, Price>;
};

export interface Price {
  distribution: number;
  electricityPrice: number;
  total: number;
}

export const calcPrice = (
  distribution: number,
  electricityPrice: number
): Price => {
  return {
    distribution,
    electricityPrice,
    total: distribution + electricityPrice,
  };
};

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
      name: 'G12' | 'G12W' | 'G13';
      defaultTariffZone: TariffZone.Night;
      periods: Period[];
    };
