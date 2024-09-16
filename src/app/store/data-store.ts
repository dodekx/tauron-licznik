import { computed } from '@angular/core';
import { EnergyDataRecord, Battery } from '../types/data-record';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
  type,
} from '@ngrx/signals';
import {
  addEntities,
  entityConfig,
  setAllEntities,
  setEntities,
  setEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { calculateEnergyDataWithBattery } from './calculate-increased-self-consumption';

type DataRecordState = {
  isLoaded: boolean;
  isLoading: boolean;
};
const initialState: DataRecordState = {
  isLoaded: false,
  isLoading: false,
};

const energyDataConfig = entityConfig({
  entity: type<EnergyDataRecord>(),
  collection: 'energyData',
  selectId: ({ id }: EnergyDataRecord) => id,
});

const batteryDataConfig = entityConfig({
  entity: type<Battery>(),
  collection: 'batteryData',
  selectId: ({ id }: Battery) => id,
});

export const DataRecordStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities(energyDataConfig),
  withEntities(batteryDataConfig),
  withMethods((store) => ({
    loadRecords: (items: EnergyDataRecord[]) => {
      patchState(store, { isLoaded: false });
      patchState(store, { isLoading: true });
      const updatedEntities: EnergyDataRecord[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.value === 0) {
          continue;
        }

        const existedItem = updatedEntities.find(
          (searchItem) => searchItem.id === item.id
        );
        if (!existedItem) {
          updatedEntities.push(item);
        } else {
          existedItem.value += item.value;
        }
      }
      patchState(
        store,
        setAllEntities(
          updatedEntities.sort((a, b) => a.date.getTime() - b.date.getTime()),
          {
            collection: energyDataConfig.collection,
          }
        )
      );
      patchState(store, { isLoaded: true });
      patchState(store, { isLoading: false });
    },
  })),
  withComputed((store) => ({}))
);
