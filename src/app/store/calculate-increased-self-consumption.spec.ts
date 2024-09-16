import { Battery, EnergyDataRecord } from '../types/data-record';
import { calculateIncreasedSelfConsumption } from './calculate-increased-self-consumption';

describe('calculateIncreasedSelfConsumption', () => {
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

  const perfectBattery: Battery = {
    capacity: 10,
    efficiency: 100,
    power: 10,
    id: 1,
    numberOfModules: 1,
  };

  const normalBattery: Battery = {
    capacity: 10,
    efficiency: 95,
    power: 5,

    id: 1,
    numberOfModules: 1,
  };

  it('should do nothing perfect Battery', () => {
    const selfConsumption: number = calculateIncreasedSelfConsumption(
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
      perfectBattery
    );
    expect(selfConsumption).toBe(0);
  });

  it('should charge perfect Battery', () => {
    const selfConsumption: number = calculateIncreasedSelfConsumption(
      exampleData,
      perfectBattery
    );
    expect(selfConsumption).toBe(2);
  });

  it('should charge normal battery', () => {
    const selfConsumption: number = calculateIncreasedSelfConsumption(
      exampleData,
      normalBattery
    );
    expect(selfConsumption).toBe(2);
  });

  it('should complete discharge normal battery', () => {
    const testData: EnergyDataRecord[] = [
      {
        date: new Date('2024-08-01 1:00'),
        value: 10,
        id: '1',
      },
      {
        date: new Date('2024-08-01 2:00'),
        value: -10,
        id: '2',
      },
    ];

    const selfConsumption: number = calculateIncreasedSelfConsumption(
      testData,
      normalBattery
    );
    expect(selfConsumption).toBe(9.025);
  });

  it('should discharge perfectBattery battery', () => {
    const testData: EnergyDataRecord[] = [
      {
        date: new Date('2024-08-01 1:00'),
        value: 10,
        id: '1',
      },
      {
        date: new Date('2024-08-01 2:00'),
        value: -10,
        id: '2',
      },
    ];

    const selfConsumption: number = calculateIncreasedSelfConsumption(
      testData,
      perfectBattery
    );
    expect(selfConsumption).toBe(10);
  });

  it('should charge normal battery', () => {
    const testData: EnergyDataRecord[] = [
      {
        date: new Date('2024-08-01 1:00'),
        value: 10,
        id: '1',
      },
      {
        date: new Date('2024-08-01 2:00'),
        value: -15,
        id: '2',
      },
    ];

    const selfConsumption: number = calculateIncreasedSelfConsumption(
      testData,
      perfectBattery
    );
    expect(selfConsumption).toBe(10);
  });
});
