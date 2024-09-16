import { Battery, EnergyDataRecord } from '../types/data-record';

type Tariff = 'G11' | 'G12' | 'G12W' | 'G13';

export type TariffRates = {
  [key in Tariff]: {
    [key: string]: number;
  };
};

export const tariffRates: TariffRates = {
  G11: { allDay: 0.98 },
  G12: { day: 1.07, night: 0.75 },
  G12W: { day: 1.12, night: 0.75 },
  G13: { day: 0.9, night: 0.71, top: 1.08 },
};

export function calculateG11Price(record: EnergyDataRecord): number {
  if (record.value >= 0) {
    return 0;
  }

  return record.value * tariffRates.G11['allDay'];
}

export function calculateG12Price(record: EnergyDataRecord): number {
  const getPriceType = ({ date }: EnergyDataRecord): 'night' | 'day' => {
    const hours = date.getHours();
    if (hours < 7) {
      return 'night';
    } else if (hours > 13 && hours < 16) {
      return 'night';
    } else if (hours > 22) {
      return 'night';
    }

    return 'day';
  };

  if (record.value >= 0) {
    return 0;
  }

  return record.value * tariffRates.G12[getPriceType(record)];
}

export function calculateG12WPrice(record: EnergyDataRecord): number {
  const getPriceType = ({ date }: EnergyDataRecord): 'night' | 'day' => {
    const hours = date.getHours();
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (isWeekend) {
      return 'night';
    }

    if (hours < 7) {
      return 'night';
    }

    if (hours > 13 && hours < 16) {
      return 'night';
    }

    if (hours > 22) {
      return 'night';
    }

    return 'day';
  };

  if (record.value >= 0) {
    return 0;
  }

  return record.value * tariffRates.G12W[getPriceType(record)];
}

export function calculateG13Price(record: EnergyDataRecord): number {
  const getPriceType = ({
    date,
  }: EnergyDataRecord): 'night' | 'day' | 'top' => {
    const hours = date.getHours();
    const month = date.getMonth();
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const APRIL = 3;
    const OCTOBER = 9;

    if (isWeekend) {
      return 'night';
    }

    if (hours < 7) {
      return 'night';
    }
    if (hours < 13) {
      return 'day';
    }

    if (month < APRIL && hours < 17) {
      return 'night';
    }

    if (month < APRIL && hours > 22) {
      return 'night';
    }

    if (month >= OCTOBER && hours < 17) {
      return 'night';
    }

    if (month >= OCTOBER && hours > 23) {
      return 'night';
    }

    if (month >= APRIL && month < OCTOBER && hours < 19) {
      return 'night';
    }

    return 'top';
  };

  if (record.value >= 0) {
    return 0;
  }

  return record.value * tariffRates.G13[getPriceType(record)];
}
