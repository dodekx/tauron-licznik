
import {EnergyData} from "../calculate-energy-data-with-battery";
import {Battery} from "../../types/battery";
import {EnergyDataRow} from "../../types/energy-data-record";
import {calculatePriceWithinDifferentTariffs, EnergyPricesInDifferentTariffs} from "../../store/price/calculate-price";
import {Tariff} from "../../store/tariff/tariff-definitions";
import {getRCEmMonthlyPrice} from "../net-billing-monthly-price-const";

export function calculateMonthlyNetMetering(
  energyData: EnergyDataRow[],
  battery: Battery
): EnergyData {
  let batteryCharge = 0; // aktualny stan naładowania baterii w kWh
  let selfConsumption = 0; // autokonsumpcja w kWh
  let fedIntoGrid = 0;
  let consumption = 0;
  let energyProductionPrice = 0;

  let energyConsumptionPrice: EnergyPricesInDifferentTariffs = {
    [Tariff.G11]: 0,
    [Tariff.G12]: 0,
    [Tariff.G12W]: 0,
    [Tariff.G13]: 0,
  };

  for (const record of energyData) {
    if (record.value === 0) {
      continue;
    }

    if (record.value > 0) {
      const availableEnergy = record.value;
      const energyToStore = Math.min(
        availableEnergy * (battery.efficiency / 100),
        battery.capacity - batteryCharge
      );
      batteryCharge += energyToStore;

      const toGridAmount = availableEnergy - energyToStore;
      fedIntoGrid += toGridAmount;

      energyProductionPrice +=
        getRCEmMonthlyPrice(record.date.getFullYear(), record.date.getMonth()) *
        toGridAmount;
    } else {
      const energyNeeded = Math.abs(record.value);
      const availableEnergy = batteryCharge * (battery.efficiency / 100);

      if (availableEnergy < energyNeeded) {
        batteryCharge = 0;
        selfConsumption += availableEnergy;
        const sumPrice = (
          a: EnergyPricesInDifferentTariffs,
          b: EnergyPricesInDifferentTariffs
        ): EnergyPricesInDifferentTariffs => {
          return {
            [Tariff.G11]: a[Tariff.G11] + b[Tariff.G11],
            [Tariff.G12]: a[Tariff.G12] + b[Tariff.G12],
            [Tariff.G12W]: a[Tariff.G12W] + b[Tariff.G12W],
            [Tariff.G13]: a[Tariff.G13] + b[Tariff.G13],
          };
        };

        energyConsumptionPrice = sumPrice(
          energyConsumptionPrice,
          calculatePriceWithinDifferentTariffs(record)
        );
        consumption += record.value;
      } else {
        batteryCharge -= (energyNeeded * 100) / battery.efficiency;
        selfConsumption += energyNeeded;
      }
    }
  }

  return {
    selfConsumption,
    fedIntoGrid,
    consumption: Math.abs(consumption),
    priceG11: Math.max(
      Math.abs(energyConsumptionPrice[Tariff.G11]) - energyProductionPrice,
      0
    ),
    priceG12: Math.max(
      Math.abs(energyConsumptionPrice[Tariff.G12]) - energyProductionPrice,
      0
    ),
    priceG12W: Math.max(
      Math.abs(energyConsumptionPrice[Tariff.G12W]) - energyProductionPrice,
      0
    ),
    priceG13: Math.max(
      Math.abs(energyConsumptionPrice[Tariff.G13]) - energyProductionPrice,
      0
    ),
  };
}
