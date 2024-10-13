import { EnergyDataRecord } from '../types/energy-data-record';
import {
  calculateG11TariffEnergyAmount,
  calculateG12TariffEnergyAmount,
  calculateG12WTariffEnergyAmount,
  calculateG13TariffEnergyAmount,
} from './calculate-tariff-energy-amount';
import { TariffEnergyAmountData } from './tariff-definitions';

describe('CalculateTariffEnergyAmount', () => {
  describe('calculateG11TariffEnergyAmount', () => {
    it('should calculate G11 tariff energy amount', () => {
      const energyDataRecord: EnergyDataRecord = {
        date: new Date('2024-07-01T07:00:00Z'),
        value: -1,
        id: 'unique-id-123',
      };
      const tariffEnergyAmountData: TariffEnergyAmountData = {
        amount: { Day: 0 },
        totalAmount: 0,
      };
      const result = calculateG11TariffEnergyAmount(
        tariffEnergyAmountData,
        energyDataRecord
      );

      expect(result).toEqual({
        amount: { Day: 1 },
        totalAmount: 1,
      });
    });
  });

  describe('calculateG12TariffEnergyAmount', () => {
    it('should calculate G12 tariff energy amount for day', () => {
      const energyDataRecord: EnergyDataRecord = {
        date: new Date('2024-07-01T10:00:00Z'),
        value: -1,
        id: 'unique-id-123',
      };
      const tariffEnergyAmountData: TariffEnergyAmountData = {
        amount: { Day: 0, Night: 0 },
        totalAmount: 0,
      };
      const result = calculateG12TariffEnergyAmount(
        tariffEnergyAmountData,
        energyDataRecord
      );

      expect(result).toEqual({
        amount: { Day: 1, Night: 0 },
        totalAmount: 1,
      });
    });

    it('should calculate G12 tariff energy amount for night', () => {
      const energyDataRecord: EnergyDataRecord = {
        date: new Date('2024-07-01T04:00:00Z'),
        value: -1,
        id: 'unique-id-123',
      };
      const tariffEnergyAmountData: TariffEnergyAmountData = {
        amount: { Day: 0, Night: 0 },
        totalAmount: 0,
      };
      const result = calculateG12TariffEnergyAmount(
        tariffEnergyAmountData,
        energyDataRecord
      );

      expect(result).toEqual({
        amount: { Day: 0, Night: 1 },
        totalAmount: 1,
      });
    });

    it('should calculate G12 tariff energy amount for night for existed record', () => {
      const energyDataRecord: EnergyDataRecord = {
        date: new Date('2024-07-01T04:00:00Z'),
        value: -1,
        id: 'unique-id-123',
      };
      const tariffEnergyAmountData: TariffEnergyAmountData = {
        amount: { Day: 0, Night: 1 },
        totalAmount: 1,
      };
      const result = calculateG12TariffEnergyAmount(
        tariffEnergyAmountData,
        energyDataRecord
      );

      expect(result).toEqual({
        amount: { Day: 0, Night: 2 },
        totalAmount: 2,
      });
    });
  });

  describe('calculateG12WTariffEnergyAmount', () => {
    it('should calculate G12W tariff energy amount for weekday', () => {
      const energyDataRecord: EnergyDataRecord = {
        date: new Date('2024-07-06T10:00:00Z'),
        value: -1,
        id: 'unique-id-123',
      };
      const tariffEnergyAmountData: TariffEnergyAmountData = {
        amount: { Day: 0, Night: 0 },
        totalAmount: 0,
      };
      const result = calculateG12WTariffEnergyAmount(
        tariffEnergyAmountData,
        energyDataRecord
      );

      expect(result).toEqual({
        amount: { Day: 0, Night: 1 },
        totalAmount: 1,
      });
    });
  });

  describe('calculateG13TariffEnergyAmount', () => {
    it('should calculate G12 tariff energy amount for peek', () => {
      const energyDataRecord: EnergyDataRecord = {
        date: new Date('2024-07-01T20:00:00Z'),
        value: -1,
        id: 'unique-id-123',
      };
      const tariffEnergyAmountData: TariffEnergyAmountData = {
        amount: { Day: 0, Night: 0, Peak: 0 },
        totalAmount: 0,
      };
      const result = calculateG13TariffEnergyAmount(
        tariffEnergyAmountData,
        energyDataRecord
      );

      expect(result).toEqual({
        amount: { Day: 0, Peak: 1, Night: 0 },
        totalAmount: 1,
      });
    });
  });
});
