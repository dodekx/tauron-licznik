import { Component, inject } from '@angular/core';
import { EnergyDataRecord } from '../../types/data-record';
import { DataRecordStore } from '../../store/data-store';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CsvImportService } from '../../services/csv-import.service';

@Component({
  selector: 'app-load-data-tauron',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule],
  templateUrl: './load-data-tauron.component.html',
  styleUrl: './load-data-tauron.component.scss',
})
export class LoadDataTauronComponent {
  readonly csvService = inject(CsvImportService);
  readonly store = inject(DataRecordStore);

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.csvService
        .parseCSV(file)
        .then((data: EnergyDataRecord[]) => {
          this.store.loadRecords(data);
        })
        .catch((error) => {
          console.error('Error parsing CSV file:', error);
        });
    }
  }
}
