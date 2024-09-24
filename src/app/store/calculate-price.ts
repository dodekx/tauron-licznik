import { EnergyDataRecord } from '../types/energy-data-record';

type Tariff = 'G11' | 'G12' | 'G12W' | 'G13';

export type TariffRates = {
  [key in Tariff]: Record<string, Price>;
};

export interface Price {
  distribution: number;
  electricityPrice: number;
  total: number;
}

const calcPrice = (distribution: number, electricityPrice: number): Price => {
  return {
    distribution,
    electricityPrice,
    total: distribution + electricityPrice,
  };
};

export const tariffRates: TariffRates = {
  G11: { allDay: calcPrice(0.627, 0.2573) },
  G12: { day: calcPrice(0.627, 0.2934), night: calcPrice(0.462, 0.0618) },
  G12W: { day: calcPrice(0.844, 0.3314), night: calcPrice(0.462, 0.0527) },
  G13: {
    day: calcPrice(0.67, 0.1922),
    top: calcPrice(0.956, 0.3401),
    night: calcPrice(0.514, 0.0356),
  },
};

export function calculateG11Price(record: EnergyDataRecord): number {
  if (record.value >= 0) {
    return 0;
  }

  return record.value * tariffRates.G11['allDay'].total;
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

  return record.value * tariffRates.G12[getPriceType(record)].total;
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

  return record.value * tariffRates.G12W[getPriceType(record)].total;
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

  return record.value * tariffRates.G13[getPriceType(record)].total;
}
