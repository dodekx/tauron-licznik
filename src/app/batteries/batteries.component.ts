import { Component, inject } from '@angular/core';

import { Battery } from '../types/battery';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataRecordStore } from '../store/data-record-store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-batteries',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './batteries.component.html',
  styleUrl: './batteries.component.scss',
})
export class BatteriesComponent {
  readonly store = inject(DataRecordStore);
  readonly energyStorages: Battery[] = this.store.batteryDataEntities();
  readonly displayedColumns: string[] = [
    'id',
    'capacity',
    'power',
    'efficiency',
    'actions',
  ];
  private readonly fb: FormBuilder = inject(FormBuilder);
  deleteStorage(id: string) {
    this.store.deleteBattery(id);
  }

  addBattery() {
    if (this.batteryForm.valid) {
      const newBattery = this.batteryForm.value;
      // Add the new battery to your data source
      console.log('New Battery:', newBattery);
      this.batteryForm.reset();
    }
  }

  batteryForm = this.fb.group({
    id: ['', Validators.required],
    capacity: [0, [Validators.required, Validators.min(0)]],
    power: [0, [Validators.required, Validators.min(0)]],
    efficiency: [
      0,
      [Validators.required, Validators.min(0), Validators.max(100)],
    ],
  });
}
