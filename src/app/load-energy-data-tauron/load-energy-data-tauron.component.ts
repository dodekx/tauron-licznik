import { Component, inject, signal } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { LoadDataTauronComponent } from './components/load-data-tauron.component/load-data-tauron.component';
import { loadEnergyDataTauronFileStore } from './load-energy-data-tauron.store';
import { FileListComponent } from "./components/file-list/file-list.component";

const angulaMaterialsImport = [
  MatToolbarModule,
  MatExpansionModule,
  MatListModule,
  MatCheckboxModule,
  MatIconModule,
];

@Component({
  selector: 'app-load-energy-data-tauron',
  standalone: true,
  imports: [...angulaMaterialsImport, LoadDataTauronComponent, FileListComponent],
  providers: [loadEnergyDataTauronFileStore],
  templateUrl: './load-energy-data-tauron.component.html',
  styleUrl: './load-energy-data-tauron.component.scss',
})
export class LoadEnergyDataTauronComponent {
  readonly store = inject(loadEnergyDataTauronFileStore);
  readonly panelOpenState = signal(false);
}
