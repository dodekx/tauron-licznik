import { Routes } from '@angular/router';
import { LoadEnergyDataTauronComponent } from './load-energy-data-tauron/load-energy-data-tauron.component';
import { EnergySummaryListComponent } from './energy-summary-list/energy-summary-list.component';
import { BatteriesComponent } from './batteries/batteries.component';
import { TariffRatesComponent } from './tariff-rates/tariff-rates.component';

export type PossibleRoute = Record<string, RouteDescription>;

export interface RouteDescription {
  label: string;
  path: string;
}

export const mainMenu: PossibleRoute = {
  import: {
    label: 'Import danych z licznika',
    path: 'import',
  },
  batterySettings: {
    label: 'Ustawienia Baterii',
    path: 'ustawienia-magazynow',
  },
  tariffSettings: {
    label: 'Ustawienia Taryf',
    path: 'ustawienia-taryf',
  },
  dashboard: {
    label: 'Wynik symulacji',
    path: 'wyniki',
  },
};

export const routes: Routes = [
  { path: mainMenu['import'].path, component: LoadEnergyDataTauronComponent },
  { path: mainMenu['dashboard'].path, component: EnergySummaryListComponent },
  { path: mainMenu['batterySettings'].path, component: BatteriesComponent },
  { path: mainMenu['tariffSettings'].path, component: TariffRatesComponent },
  { path: '**', redirectTo: 'import' },
];
