import { Battery } from '../types/battery';
import { EnergyDataRow } from '../types/energy-data-record';

import { ProsumerType } from '../store/energy-data-store/prosument-type.enum';
import {calculateNetMetering} from "./model/calculateNetMetering";
import {calculateMonthlyNetMetering} from "./model/calculateMonthlyNetMetering";

export interface EnergyData {
  selfConsumption: number;
  consumption: number;
  fedIntoGrid: number;
  priceG11: number;
  priceG12: number;
  priceG12W: number;
  priceG13: number;
}

export function energySummaryDecorator(
  energyData: EnergyDataRow[],
  battery: Battery,
  prosumentType: ProsumerType = ProsumerType.netMetering70
): EnergyData {
  if (
    prosumentType === ProsumerType.netMetering70 ||
    prosumentType === ProsumerType.netMetering80
  ) {
    return calculateNetMetering(energyData, battery, prosumentType);
  }

  return calculateMonthlyNetMetering(energyData, battery);
}



