import { Battery } from '../types/data-record';

export const bydHVS: Battery[] = [
  { capacity: 5.1, power: 5.1, efficiency: 96, numberOfModules: 2 },
  { capacity: 7.7, power: 7.7, efficiency: 96, numberOfModules: 3 },
  { capacity: 10.2, power: 10.2, efficiency: 96, numberOfModules: 4 },
  { capacity: 12.8, power: 12.8, efficiency: 96, numberOfModules: 5 },
].map((battery) => ({
  ...battery,
  id: `HVS-${battery.numberOfModules}`,
}));

export const bydHVM: Battery[] = [
  { capacity: 5.52, power: 5.52, efficiency: 96, numberOfModules: 2 },
  { capacity: 8.3, power: 8.3, efficiency: 96, numberOfModules: 3 },
  { capacity: 11.0, power: 11.0, efficiency: 96, numberOfModules: 4 },
  { capacity: 13.8, power: 13.8, efficiency: 96, numberOfModules: 5 },
  { capacity: 16.6, power: 16.6, efficiency: 96, numberOfModules: 6 },
  { capacity: 19.3, power: 19.3, efficiency: 96, numberOfModules: 7 },
  { capacity: 22.1, power: 22.1, efficiency: 96, numberOfModules: 8 },
].map((battery) => ({
  ...battery,
  id: `HVM-${battery.numberOfModules}`,
}));

export const sampleBattery: Battery[] = [
  { capacity: 0, power: 1, efficiency: 96, numberOfModules: 1 },
  { capacity: 1, power: 1, efficiency: 96, numberOfModules: 1 },
  { capacity: 2, power: 1, efficiency: 96, numberOfModules: 1 },
  { capacity: 3, power: 2, efficiency: 96, numberOfModules: 1 },
  { capacity: 4, power: 2, efficiency: 96, numberOfModules: 1 },
  { capacity: 6, power: 3, efficiency: 96, numberOfModules: 1 },
  { capacity: 8, power: 4, efficiency: 96, numberOfModules: 1 },
  { capacity: 11, power: 5, efficiency: 96, numberOfModules: 1 },
  { capacity: 16, power: 8, efficiency: 96, numberOfModules: 1 },
  { capacity: 23, power: 23, efficiency: 96, numberOfModules: 1 },
  { capacity: 50, power: 25, efficiency: 96, numberOfModules: 1 },
].map((battery) => ({
  ...battery,
  id: `sample-${battery.capacity}-kwh`,
}));
