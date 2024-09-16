import { Battery, EnergyDataRecord } from '../types/data-record';

type Tariff = 'G11' | 'G12' | 'G12W';

export type TariffRates = {
  [key in Tariff]: {
    [key: string]: number;
  };
};

export const tariffRates: TariffRates = {
  G11: { allDay: 0.98 },
  G12: { day: 1.07, night: 0.75 },
  G12W: { day: 1.12, night: 0.75 },
};

export function calculatePrice(
  energyData: EnergyDataRecord[],
  tariff: Tariff
): number {
  let price = 0;

  switch (tariff) {
    case 'G12W':
      price = calculateG12WPrice(energyData);
      break;
    case 'G12':
      price = calculateG12Price(energyData);
      break;
    default:
      price = calculateG11Price(energyData);
      break;
  }
  return -Math.round(price * 100) / 100;
}

export function calculateG11Price(energyData: EnergyDataRecord[]): number {
  return energyData.reduce((sum: number, record) => {
    if (record.value >= 0) {
      return sum;
    }

    return (sum += record.value * tariffRates.G11['allDay']);
  }, 0);
}

export function calculateG12Price(energyData: EnergyDataRecord[]): number {
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

  return energyData.reduce((sum: number, record) => {
    if (record.value >= 0) {
      return sum;
    }

    return (sum += record.value * tariffRates.G12[getPriceType(record)]);
  }, 0);
}

export function calculateG12WPrice(energyData: EnergyDataRecord[]): number {
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

  return energyData.reduce((sum: number, record) => {
    if (record.value >= 0) {
      return sum;
    }

    return (sum += record.value * tariffRates.G12[getPriceType(record)]);
  }, 0);
}

