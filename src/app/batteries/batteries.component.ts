import { Component, inject } from '@angular/core';

import { Battery } from '../types/battery';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataRecordStore } from '../store/data-record-store';

@Component({
  selector: 'app-batteries',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './batteries.component.html',
  styleUrl: './batteries.component.scss',
})
export class BatteriesComponent {
  readonly store = inject(DataRecordStore);
  readonly energyStorages: Battery[] = this.store.batteryDataEntities();
  readonly displayedColumns: string[] = ['id', 'capacity', 'power', 'actions'];

  deleteStorage(id: string) {
    this.store.deleteBattery(id);
  }

  addStorage() {
    // Implementacja dodawania nowego magazynu
    // np. poprzez wyświetlenie modalnego okna z formularzem
  }
}
