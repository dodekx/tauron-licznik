import { Component, inject, Signal, computed, Inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { loadEnergyDataTauronFileStore } from '../../load-energy-data-tauron.store';
import { compose } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { EnergyDataRecord } from '../../../types/energy-data-record';
import { CsvImportService } from '../../services/csv-import.service';
import { DataRecordStore } from '../../../store/data-store';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss',
})
export class FileListComponent {
  readonly loadEnergyDataTauronFileStore = inject(
    loadEnergyDataTauronFileStore
  );

  readonly csvService = inject(CsvImportService);
  readonly dataRecordStore = inject(DataRecordStore);

  files = computed<FileListItem[]>(() => {
    return this.loadEnergyDataTauronFileStore.entities().map((file) => {
      const fileName = file.fileEntry.name;
      return {
        name: fileName,
        isValid: fileName.endsWith('.csv'),
      };
    });
  });

  isReadyForImpoportData = computed<boolean>(() => {
    return this.files().some((file) => file.isValid);
  });

  thereNeedRemoveWrongFilesFromTheList = computed<boolean>(() => {
    return this.files().some((file) => !file.isValid);
  });

  clearWrongFiles() {
    this.loadEnergyDataTauronFileStore.removeWrongFilesFromTheList();
  }

  async loadData() {
    let records: EnergyDataRecord[] = [];
    for (const droppedFile of this.loadEnergyDataTauronFileStore.entities()) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          console.log('Accepted file:', file);
          const partials = await this.csvService.parseCSV(file);
          this.dataRecordStore.loadRecords(partials);
        });
      }
    }
  }
}

interface FileListItem {
  name: string;
  isValid: boolean;
}
