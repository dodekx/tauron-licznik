import {
  Component,
  computed,
  inject,
  effect,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { DataRecordStore } from '../../store/data-store';
import { bydHVM, bydHVS, sampleBattery } from '../../batteries-data/byd_hvs';
import { calculateIncreasedSelfConsumption } from '../../store/calculate-increased-self-consumption';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Battery, EnergyDataRecord } from '../../types/data-record';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  calculateG12Price,
  calculatePrice,
} from '../../store/calculate-g11-price';

@Component({
  selector: 'app-energy-summary-list',
  standalone: true,
  imports: [MatListModule, CommonModule, MatSort, MatPaginator, MatTableModule],
  templateUrl: './energy-summary-list.component.html',
  styleUrl: './energy-summary-list.component.scss',
})
export class EnergySummaryListComponent {
  readonly store = inject(DataRecordStore);
  displayedColumns: string[] = ['id', 'capacity', 'power', 'selfConsumption'];

  batteryRows = computed<MatTableDataSource<BatterySummary>>(() => {
    const energyDataEntities = this.store.energyDataEntities();

    const batteries = [...sampleBattery]
      .sort((a, b) => a.capacity - b.capacity)
      .map((battery) => {
        return {
          ...battery,
          selfConsumption: calculateIncreasedSelfConsumption(
            energyDataEntities,
            battery
          ),
        };
      });
    return new MatTableDataSource(batteries);
  });

  totalEnergyConsumption = computed(() =>
    Math.abs(
      this.store
        .energyDataEntities()
        .reduce((previousValue: number, { value }: EnergyDataRecord) => {
          return value < 0 ? previousValue + value : previousValue;
        }, 0)
    )
  );

  totalEnergyProduction = computed(() =>
    this.store
      .energyDataEntities()
      .reduce((previousValue: number, { value, id }: EnergyDataRecord) => {
        console.log(previousValue, value, id);

        return value > 0 ? previousValue + value : previousValue;
      }, 0)
  );

  g11Price = computed(() =>
    calculatePrice(this.store.energyDataEntities(), 'G11')
  );

  g12Price = computed(() =>
    calculatePrice(this.store.energyDataEntities(), 'G12')
  );

  g12WPrice = computed(() =>
    calculatePrice(this.store.energyDataEntities(), 'G12W')
  );
}

interface BatterySummary extends Battery {
  selfConsumption: number;
}
