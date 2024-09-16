import { Battery, EnergyDataRecord } from '../types/data-record';

export function calculateIncreasedSelfConsumption(
  energyData: EnergyDataRecord[],
  battery: Battery
): number {
  let batteryCharge = 0; // aktualny stan naładowania baterii w kWh
  let selfConsumption = 0; // autokonsumpcja w kWh

  for (const record of energyData) {
    if (record.value === 0) {
      continue;
    }

    if (record.value > 0) {
      const availableEnergy = record.value * (battery.efficiency / 100);
      const energyToStore = Math.min(
        availableEnergy,
        battery.capacity - batteryCharge
      );
      batteryCharge += energyToStore;
      // selfConsumption += record.value - energyToStore;prawdopodobnie niepotrzebne
    } else {
      if (batteryCharge <= 0) {
        continue;
      }
      const energyNeeded = Math.abs(record.value);
      const availableEnergy = batteryCharge * (battery.efficiency / 100);

      if (availableEnergy < energyNeeded) {
        batteryCharge = 0;
        selfConsumption += availableEnergy;
      } else {
        batteryCharge -= (energyNeeded * 100) / battery.efficiency;
        selfConsumption += energyNeeded;
      }
    }
  }
  return Math.round(selfConsumption);
}
