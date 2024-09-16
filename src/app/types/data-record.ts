export interface EnergyDataRecord {
  date: Date;
  value: number;
  id: string;
}

export interface EnergyDataRecordCSV {
  date: string;
  value: number;
  type: 'oddanie' | 'pobór';
}

export interface Battery {
  capacity: number; // pojemność w kWh
  power: number; // moc w kW
  efficiency: number; // sprawność w %
  numberOfModules?: number; // liczba modolow
  id: string;
}

export {};
