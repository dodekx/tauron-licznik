import {
  G12TariffTimeSet,
  G12WTariffTimeSet,
  G13TariffTimeSet,
  getTariffZone,
} from './tariffe-time-set';
import { TariffZone, TariffRates, calcPrice } from './tariff-definitions';
import { EnergyDataRecord } from '../types/energy-data-record';

export const tariffRates: TariffRates = {
  G11: { [TariffZone.Day]: calcPrice(0.627, 0.2573) },
  G12: {
    [TariffZone.Day]: calcPrice(0.627, 0.2934),
    [TariffZone.Night]: calcPrice(0.462, 0.0618),
  },
  G12W: {
    [TariffZone.Day]: calcPrice(0.844, 0.3314),
    [TariffZone.Night]: calcPrice(0.462, 0.0527),
  },
  G13: {
    [TariffZone.Day]: calcPrice(0.67, 0.1922),
    [TariffZone.Peak]: calcPrice(0.956, 0.3401),
    [TariffZone.Night]: calcPrice(0.514, 0.0356),
  },
};

export function calculateG11Price(record: EnergyDataRecord): number {
  if (record.value >= 0) {
    return 0;
  }

  return record.value * tariffRates.G11[TariffZone.Day].total;
}

export function calculateG12Price(record: EnergyDataRecord): number {
  if (record.value >= 0) {
    return 0;
  }

  const tariffZone = getTariffZone(G12TariffTimeSet, record.date);
  return record.value * tariffRates.G12[tariffZone].total;
}

export function calculateG12WPrice(record: EnergyDataRecord): number {
  if (record.value >= 0) {
    return 0;
  }

  const tariffZone = getTariffZone(G12WTariffTimeSet, record.date);
  return record.value * tariffRates.G12W[tariffZone].total;
}

export function calculateG13Price(record: EnergyDataRecord): number {
  if (record.value >= 0) {
    return 0;
  }

  const tariffZone = getTariffZone(G13TariffTimeSet, record.date);
  return record.value * tariffRates.G13[tariffZone].total;
}
