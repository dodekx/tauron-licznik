import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { EnergyDataStore } from '../store/energy-data-store/data-record-store';
import { energySummaryDecorator } from './calculate-energy-data-with-battery';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BatteriesDataStore } from '../store/battery/battieries-data-store';
import { ProsumerTypeSelectorComponent } from './prosumer-type-selector/prosumer-type-selector.component';

@Component({
  selector: 'app-energy-summary-list',
  standalone: true,
  imports: [
    MatListModule,
    MatCardModule,
    CommonModule,
    MatSort,
    MatPaginator,
    MatTableModule,
    ProsumerTypeSelectorComponent,
  ],
  templateUrl: './energy-summary-list.component.html',
  styleUrl: './energy-summary-list.component.scss',
})
export class EnergySummaryListComponent {
  readonly changeDetectorRef = inject(ChangeDetectorRef);
  readonly dataRecordStore = inject(EnergyDataStore);
  readonly batteriesDataStore = inject(BatteriesDataStore);

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

  batteryRows = computed(() => {
    const energyDataEntities = this.dataRecordStore.entities();
    const prosumentType = this.dataRecordStore.prosumentType();
    const batteries = this.batteriesDataStore
      .entities()
      .sort((a, b) => a.capacity - b.capacity)
      .map((battery) => {
        return {
          ...battery,
          ...energySummaryDecorator(energyDataEntities, battery, prosumentType),
        };
      })
      .map((record) => {
        return {
          id: record.id,
          capacity: record.capacity,
          power: record.power,
          efficiency: record.efficiency,
          selfConsumption: record.selfConsumption,
          consumption: record.priceG11.totalAmount,
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
