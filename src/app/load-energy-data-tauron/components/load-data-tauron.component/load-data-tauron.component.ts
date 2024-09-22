import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FileListComponent } from '../file-list/file-list.component';
import { loadEnergyDataTauronFileStore } from '../../load-energy-data-tauron.store';

@Component({
  selector: 'app-load-data-tauron',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    NgxFileDropModule,
    MatTableModule,
    FileListComponent,
  ],
  templateUrl: './load-data-tauron.component.html',
  styleUrl: './load-data-tauron.component.scss',
})
export class LoadDataTauronComponent {
  readonly loadEnergyDataTauronFileStore = inject(
    loadEnergyDataTauronFileStore
  );

  files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.loadEnergyDataTauronFileStore.addFiles(
      files.filter((droppedFile) => droppedFile.fileEntry.isFile)
    );
  }
}
