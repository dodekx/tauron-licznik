import { Component, computed, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { DataRecordStore } from '../../store/data-record-store';
import { sampleBattery } from '../../batteries-data/byd_hvs';
import {
  calculateEnergyDataWithBattery,
  EnergyData,
} from '../../store/calculate-increased-self-consumption';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Battery } from '../../types/battery';

@Component({
  selector: 'app-energy-summary-list',
  standalone: true,
  imports: [MatListModule, CommonModule, MatSort, MatPaginator, MatTableModule],
  templateUrl: './energy-summary-list.component.html',
  styleUrl: './energy-summary-list.component.scss',
})
export class EnergySummaryListComponent {
  readonly store = inject(DataRecordStore);
  displayedColumns: string[] = [
    'id',
    'capacity',
    'power',
    'selfConsumption',
    'consumption',
    'fedIntoGrid',
    'priceG11',
    'priceG12',
    'priceG12W',
    'priceG13',
  ];

  batteryRows = computed<MatTableDataSource<BatterySummary>>(() => {
    const energyDataEntities = this.store.energyDataEntities();

    const batteries = [...sampleBattery]
      .sort((a, b) => a.capacity - b.capacity)
      .map((battery) => {
        return {
          ...battery,
          ...calculateEnergyDataWithBattery(energyDataEntities, battery),
        };
      });
    return new MatTableDataSource(batteries);
  });
}

interface BatterySummary extends Battery, EnergyData {
  selfConsumption: number;
}
