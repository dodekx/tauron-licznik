import { EnergyDataRecord } from '../types/energy-data-record';
import {
  Tariff,
  TariffEnergyAmountData,
  TariffTimeSet,
  TariffZone,
} from './tariff-definitions';
import {
  G11TariffTimeSet,
  G12TariffTimeSet,
  G12WTariffTimeSet,
  G13TariffTimeSet,
  getTariffZone,
} from './tariffe-time-set';

const calculateTariffEnergyAmount = (tariff: TariffTimeSet) => {
  return (
    energy: TariffEnergyAmountData,
    record: EnergyDataRecord
  ): TariffEnergyAmountData => {
    if (record.value >= 0) {
      return energy;
    }

    const tariffZone: TariffZone = getTariffZone(tariff, record.date);
    if (tariffZone in energy.amount) {
      energy.amount[tariffZone] += Math.abs(record.value);
      energy.totalAmount += Math.abs(record.value);
    } else {
      energy.amount[tariffZone] = Math.abs(record.value);
      energy.totalAmount += Math.abs(record.value);
    }

    return energy;
  };
};

export const calculateG11TariffEnergyAmount =
  calculateTariffEnergyAmount(G11TariffTimeSet);
export const calculateG12TariffEnergyAmount =
  calculateTariffEnergyAmount(G12TariffTimeSet);
export const calculateG12WTariffEnergyAmount =
  calculateTariffEnergyAmount(G12WTariffTimeSet);
export const calculateG13TariffEnergyAmount =
  calculateTariffEnergyAmount(G13TariffTimeSet);
