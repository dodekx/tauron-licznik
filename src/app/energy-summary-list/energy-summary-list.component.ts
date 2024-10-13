import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { DataRecordStore } from '../store/data-record-store';
import {
  calculateEnergyDataWithBattery,
} from '../store/calculate-increased-self-consumption';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-energy-summary-list',
  standalone: true,
  imports: [MatListModule, CommonModule, MatSort, MatPaginator, MatTableModule],
  templateUrl: './energy-summary-list.component.html',
  styleUrl: './energy-summary-list.component.scss',
})
export class EnergySummaryListComponent {
  readonly changeDetectorRef = inject(ChangeDetectorRef);
  readonly store = inject(DataRecordStore);
  displayedColumns: string[] = [
    'id',
    'capacity',
    'power',
    'selfConsumption',
    'fedIntoGrid',
    'priceG11',
    'priceG12',
    'priceG12W',
    'priceG13',
  ];

  batteryRows = computed(() => {
    const energyDataEntities = this.store.energyDataEntities();

    const batteries = this.store
      .batteryDataEntities()
      .sort((a, b) => a.capacity - b.capacity)
      .map((battery) => {
        return {
          ...battery,
          ...calculateEnergyDataWithBattery(energyDataEntities, battery),
        };
      })
      .map((record) => {
        return {
          id: record.id,
          capacity: record.capacity,
          power: record.power,
          efficiency: record.efficiency,
          selfConsumption: record.selfConsumption,
          fedIntoGrid: record.fedIntoGrid,
          priceG11: record.priceG11.totalPrice,
          priceG12: record.priceG12.totalPrice,
          priceG12W: record.priceG12W.totalPrice,
          priceG13: record.priceG13.totalPrice,
        };
      });

    return new MatTableDataSource(batteries);
  });
}
