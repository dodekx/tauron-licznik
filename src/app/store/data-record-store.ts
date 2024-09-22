import {
  patchState,
  signalStore,
  withMethods,
  withState,
  type,
} from '@ngrx/signals';
import {
  entityConfig,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { EnergyDataRecord } from '../types/energy-data-record';
import { Battery } from '../types/battery';

interface DataRecordState {
  isLoaded: boolean;
  isLoading: boolean;
}
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
      for (const item of items) {
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
      console.log('done');
    },
  }))
);
