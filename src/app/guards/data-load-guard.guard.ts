import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EnergyDataStore } from '../store/energy-data-store/data-record-store';

@Injectable({
  providedIn: 'root',
})
export class DataLoadGuard implements CanActivate {
  readonly dataRecordStore = inject(EnergyDataStore);
  readonly router = inject(Router);

  canActivate(): boolean {
    if (!this.dataRecordStore.isLoaded()) {
      this.router.navigate(['/import']);
      return false;
    }
    return true;
  }
}
