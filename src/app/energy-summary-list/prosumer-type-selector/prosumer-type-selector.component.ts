import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { ProsumerType } from '../../store/energy-data-store/prosument-type.enum';
import { EnergyDataStore } from '../../store/energy-data-store/data-record-store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-prosumer-type-selector',
  standalone: true,
  imports: [CommonModule, MatRadioModule, ReactiveFormsModule],
  templateUrl: './prosumer-type-selector.component.html',
  styleUrl: './prosumer-type-selector.component.scss',
})
export class ProsumerTypeSelectorComponent {
  readonly dataRecordStore = inject(EnergyDataStore);
  readonly prosumerTypes = ProsumerType;
  readonly fb = inject(FormBuilder);

  prosumerTypeForm = this.fb.group({
    prosumerType: [this.dataRecordStore.prosumentType(), [Validators.required]],
  });

  onTypeChange(event: MatRadioChange) {
    this.dataRecordStore.updateProsumerType(event.value);
  }
}
