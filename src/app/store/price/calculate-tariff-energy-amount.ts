import { EnergyDataRow } from '../../types/energy-data-record';
import {
  TariffEnergyAmountData,
  TariffTimeSet,
  TariffZone,
} from '../tariff/tariff-definitions';
import {
  G11TariffTimeSet,
  G12TariffTimeSet,
  G12WTariffTimeSet,
  G13TariffTimeSet,
  getTariffZone,
} from '../tariff/tariffe-time-set';

const sumTariffEnergyAmount = (
  energy: TariffEnergyAmountData,
  amount: number,
  date: Date,
  tariff: TariffTimeSet
): TariffEnergyAmountData => {
  const tariffZone: TariffZone = getTariffZone(tariff, date);
  if (tariffZone in energy.amount) {
    energy.amount[tariffZone] += Math.abs(amount);
  } else {
    energy.amount[tariffZone] = Math.abs(amount);
  }
  energy.totalAmount += Math.abs(amount);
  return energy;
};

const calculateTariffEnergyAmount = (tariff: TariffTimeSet) => {
  return (
    energy: TariffEnergyAmountData,
    { date, value }: EnergyDataRow
  ): TariffEnergyAmountData => {
    if (value >= 0) {
      return energy;
    }

    return sumTariffEnergyAmount(energy, value, date, tariff);
  };
};

const calculateTariffEnergyProductionAmount = (tariff: TariffTimeSet) => {
  return (
    energy: TariffEnergyAmountData,
    amount: number,
    date: Date
  ): TariffEnergyAmountData => {
    if (amount <= 0) {
      return energy;
    }

    return sumTariffEnergyAmount(energy, amount, date, tariff);
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

export const calculateG11TariffEnergyProductionAmount =
  calculateTariffEnergyProductionAmount(G11TariffTimeSet);
export const calculateG12TariffEnergyProductionAmount =
  calculateTariffEnergyProductionAmount(G12TariffTimeSet);
export const calculateG12WTariffEnergyProductionAmount =
  calculateTariffEnergyProductionAmount(G12WTariffTimeSet);
export const calculateG13TariffEnergyProductionAmount =
  calculateTariffEnergyProductionAmount(G13TariffTimeSet);
