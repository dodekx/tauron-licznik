import { Battery, EnergyDataRecord } from '../types/energy-data-record';
import { calculateEnergyDataWithBattery } from './calculate-increased-self-consumption';

describe('calculateIncreasedSelfConsumption', () => {
  describe('only use energy from grid', () => {
    const battery: Battery = {
      capacity: 10,
      efficiency: 95,
      power: 5,
      numberOfModules: 1,
      id: '1',
    };

    const exampleData: EnergyDataRecord[] = [
      {
        date: new Date('2024-08-01 1:00'),
        value: 10,
        id: '1',
      },
      {
        date: new Date('2024-08-01 2:00'),
        value: -2,
        id: '2',
      },
    ];

    it('selfConsumption should be 0', () => {
      const { selfConsumption } = calculateEnergyDataWithBattery(
        [
          {
            date: new Date('2024-08-01 1:00'),
            value: -10,
            id: '1',
          },
          {
            date: new Date('2024-08-01 2:00'),
            value: -2,
            id: '2',
          },
        ],
        battery
      );
      expect(selfConsumption).toBe(0);
    });

    it('should get all energy from grid', () => {
      const { consumption } = calculateEnergyDataWithBattery(
        [
          {
            date: new Date('2024-08-01 1:00'),
            value: -10,
            id: '1',
          },
          {
            date: new Date('2024-08-01 2:00'),
            value: -2,
            id: '2',
          },
        ],
        battery
      );
      expect(consumption).toBe(12);
    });

    it('should not feed grid', () => {
      const { fedIntoGrid } = calculateEnergyDataWithBattery(
        [
          {
            date: new Date('2024-08-01 1:00'),
            value: -10,
            id: '1',
          },
          {
            date: new Date('2024-08-01 2:00'),
            value: -2,
            id: '2',
          },
        ],
        battery
      );
      expect(fedIntoGrid).toBe(0);
    });
  });
});
