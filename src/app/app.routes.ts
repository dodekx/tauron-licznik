import { Routes } from '@angular/router';
import { LoadEnergyDataTauronComponent } from './load-energy-data-tauron/load-energy-data-tauron.component';
import { EnergySummaryListComponent } from './components/energy-summary-list/energy-summary-list.component';

export const routes: Routes = [
  { path: 'import', component: LoadEnergyDataTauronComponent },
  { path: 'wyniki', component: EnergySummaryListComponent },
  { path: '**', redirectTo: 'import' },
];

