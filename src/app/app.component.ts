import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataRecordStore } from './store/data-store';
import { CommonModule } from '@angular/common';
import { LoadDataTauronComponent } from './components/load-data-tauron/load-data-tauron.component';
import { EnergySummaryListComponent } from './components/energy-summary-list/energy-summary-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    LoadDataTauronComponent,
    EnergySummaryListComponent,
  ],
  providers: [DataRecordStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}


/*
TODO
wczytywanie cen gieldowych
ustawienie cen taryf g11, g12,g12w,g13 // na razie obecna stawka


*/