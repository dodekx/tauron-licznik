import { Battery } from '../types/battery';

export const sampleBattery: Battery[] = [
  { capacity: 0, power: 1, efficiency: 96 },
  { capacity: 1, power: 1, efficiency: 96 },
  { capacity: 2, power: 1, efficiency: 96 },
  { capacity: 3, power: 2, efficiency: 96 },
  { capacity: 4, power: 2, efficiency: 96 },
  { capacity: 6, power: 3, efficiency: 96 },
  { capacity: 8, power: 4, efficiency: 96 },
  { capacity: 11, power: 5, efficiency: 96 },
  { capacity: 16, power: 8, efficiency: 96 },
  { capacity: 23, power: 23, efficiency: 96 },
  { capacity: 50, power: 25, efficiency: 96 },
].map((battery) => ({
  ...battery,
  id: `sample-${battery.capacity}-kwh`,
}));
