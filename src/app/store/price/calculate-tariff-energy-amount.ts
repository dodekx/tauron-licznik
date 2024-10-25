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
    { date, value }:Omit<EnergyDataRow, 'id'>
  ): TariffEnergyAmountData => {


    return sumTariffEnergyAmount(energy, value, date, tariff);
  };
};


export const sumG11TariffEnergyAmount =
  calculateTariffEnergyAmount(G11TariffTimeSet);
export const sumG12TariffEnergyAmount =
  calculateTariffEnergyAmount(G12TariffTimeSet);
export const sumG12WTariffEnergyAmount =
  calculateTariffEnergyAmount(G12WTariffTimeSet);
export const sumG13TariffEnergyAmount =
  calculateTariffEnergyAmount(G13TariffTimeSet);



const calculateTariffZone = (tariff: TariffTimeSet) => {
  return (date: Date): TariffZone => {
    return getTariffZone(tariff, date);
  };
};

export const calculateG12TariffZone = calculateTariffZone(G12TariffTimeSet);
export const calculateG12WTariffZone = calculateTariffZone(G12WTariffTimeSet);
export const calculateG13TariffZone = calculateTariffZone(G13TariffTimeSet);
