import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { EnergyDataRecordCSV } from '../types/energy-data-record-csv';
import { EnergyDataRow } from '../../types/energy-data-record';
@Injectable({
  providedIn: 'root',
})
export class CsvImportService {
  parseCSV(file: File): Promise<EnergyDataRow[]> {
    return new Promise((resolve, reject) => {
      Papa.parse<EnergyDataRecordCSV>(file, {
        header: true,
        delimiter: ';',
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header) => {
          header = header.trim();
          switch (header) {
            case 'Data':
              return 'date';
            case 'Wartość kWh':
              return 'value';
            case 'Rodzaj':
              return 'type';
            default:
              return header;
          }
        },
        transform: (value, header) => {
          if (header === 'value') {
            return parseFloat(value.replace(',', '.'));
          }
          return value;
        },
        complete: (results) => {
          const data = results.data.map(
            ({ date: dateTime, type, value }: EnergyDataRecordCSV) => {
              return {
                value: type === 'oddanie' ? value : -value * 1,
                date: new Date(dateTime),
                id: `${dateTime}-${type}`,
              };
            }
          );
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
}
