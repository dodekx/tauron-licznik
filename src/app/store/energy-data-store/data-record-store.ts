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
import { EnergyDataRow } from '../../types/energy-data-record';
import { ProsumerType } from './prosument-type.enum';

interface DataRecordState {
  isLoaded: boolean;
  isLoading: boolean;
  prosumentType: ProsumerType;
}
const initialState: DataRecordState = {
  isLoaded: false,
  isLoading: false,
  prosumentType: ProsumerType.netMetering70,
};

const energyDataConfig = entityConfig({
  entity: type<EnergyDataRow>(),
  selectId: ({ id }: EnergyDataRow) => id,
});

export const EnergyDataStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities(energyDataConfig),
  withMethods((store) => ({
    loadRecords: (items: EnergyDataRow[]) => {
      patchState(store, { isLoaded: false });
      patchState(store, { isLoading: true });
      const updatedEntities: EnergyDataRow[] = [];
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
          updatedEntities.sort((a, b) => a.date.getTime() - b.date.getTime())
        )
      );
      patchState(store, { isLoaded: true });
      patchState(store, { isLoading: false });

    },
    updateProsumerType: (prosumentType: ProsumerType) => {
      patchState(store, { prosumentType });
    },
  }))
);
// Todo przeniejs tutaj obliczanie energy ammount i price
