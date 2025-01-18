import {EnergyDataRow} from "../../types/energy-data-record";
import {Battery} from "../../types/battery";
import {ProsumerType} from "../../store/energy-data-store/prosument-type.enum";
import {TariffEnergyAmountData, TariffZone} from "../../store/tariff/tariff-definitions";
import {
  sumG11TariffEnergyAmount,
  sumG12TariffEnergyAmount
  , sumG12WTariffEnergyAmount
  , sumG13TariffEnergyAmount,

} from "../../store/price/calculate-tariff-energy-amount";
import {
  calculatePrice,
  TariffG11Price,
  TariffG12Price,
  TariffG12WPrice,
  TariffG13Price
} from "../../store/price/calculate-price";
import {EnergyData} from "../calculate-energy-data-with-battery";

export function calculateNetMetering(
    energyData: EnergyDataRow[],
    battery: Battery,
    prosumentType: ProsumerType = ProsumerType.netMetering70
): EnergyData {
    let batteryCharge = 0; // aktualny stan naładowania baterii w kWh
    let selfConsumption = 0; // autokonsumpcja w kWh
    let fedIntoGrid = 0; // wyslane do sieci

  const gridEnergyMultiplayer = prosumentType === ProsumerType.netMetering70 ? 0.7 : 0.8;


    const initializeTariffData = (zones: TariffZone[]): TariffEnergyAmountData => ({
        amount: zones.reduce((acc, zone) => ({...acc, [zone]: 0}), {[TariffZone.Day]: 0}),
        totalAmount: 0,
    });

    let calculatedG11Amount = initializeTariffData([TariffZone.Day]);
    let calculatedG12Amount = initializeTariffData([TariffZone.Day, TariffZone.Night]);
    let calculatedG12WAmount = initializeTariffData([TariffZone.Day, TariffZone.Night]);
    let calculatedG13Amount = initializeTariffData([TariffZone.Day, TariffZone.Night, TariffZone.Peak]);



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
            const includedEnergyFromProsumer = toGridAmount * gridEnergyMultiplayer

          calculatedG11Amount = sumG11TariffEnergyAmount(calculatedG11Amount, {
            date:record.date,
            value:includedEnergyFromProsumer
          });
          calculatedG12Amount = sumG12TariffEnergyAmount(calculatedG12Amount, {
            date:record.date,
            value:includedEnergyFromProsumer
          });
          calculatedG12WAmount = sumG12WTariffEnergyAmount(calculatedG12WAmount,{
            date:record.date,
            value:includedEnergyFromProsumer
          });
          calculatedG13Amount = sumG13TariffEnergyAmount(calculatedG13Amount, {
            date:record.date,
            value:includedEnergyFromProsumer
          });


        } else {
            const energyNeeded = Math.abs(record.value);
            const availableEnergy = batteryCharge * (battery.efficiency / 100);
            if (availableEnergy < energyNeeded) {
                batteryCharge = 0;
                selfConsumption += availableEnergy;
                calculatedG11Amount = sumG11TariffEnergyAmount(calculatedG11Amount, record);
                calculatedG12Amount = sumG12TariffEnergyAmount(calculatedG12Amount, record);
                calculatedG12WAmount = sumG12WTariffEnergyAmount(calculatedG12WAmount, record);
                calculatedG13Amount = sumG13TariffEnergyAmount(calculatedG13Amount, record);
            } else {
                batteryCharge -= (energyNeeded * 100) / battery.efficiency;
                selfConsumption += energyNeeded;
            }
        }
    }


    return {
        selfConsumption,
        fedIntoGrid,
        consumption: calculatedG11Amount.totalAmount,
        priceG11: calculatePrice({...calculatedG11Amount}, TariffG11Price),
        priceG12: calculatePrice({...calculatedG12Amount}, TariffG12Price),
        priceG12W: calculatePrice({...calculatedG12WAmount}, TariffG12WPrice),
        priceG13: calculatePrice({...calculatedG13Amount}, TariffG13Price),
    };
}
