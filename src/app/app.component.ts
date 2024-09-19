import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataRecordStore } from './store/data-record-store';
import { CommonModule } from '@angular/common';
import { LoadDataTauronComponent } from './load-energy-data-tauron/components/load-data-tauron.component/load-data-tauron.component';
import { EnergySummaryListComponent } from './components/energy-summary-list/energy-summary-list.component';
import { LoadEnergyDataTauronComponent } from './load-energy-data-tauron/load-energy-data-tauron.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    EnergySummaryListComponent,
    LoadEnergyDataTauronComponent,
    MatToolbarModule,
    MatSidenavModule,
  ],
  providers: [DataRecordStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  store = inject(DataRecordStore);
}
