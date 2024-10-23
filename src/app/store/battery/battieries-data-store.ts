import { patchState, signalStore, withMethods, type } from '@ngrx/signals';
import {
  addEntity,
  entityConfig,
  removeEntity,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { Battery } from '../../types/battery';
import { sampleBattery } from '../../batteries/byd_hvs';

const batteryDataConfig = entityConfig({
  entity: type<Battery>(),
  selectId: ({ id }: Battery) => id,
});

export const BatteriesDataStore = signalStore(
  { providedIn: 'root' },
  withEntities(batteryDataConfig),
  withMethods((store) => ({
    initializeBatteries: () => {
      patchState(store, setAllEntities(sampleBattery));
    },
    deleteBattery: (id: string) => {
      patchState(store, removeEntity(id));
    },
    addBattery: (battery: Battery) => {
      patchState(store, addEntity(battery));
    },
  }))
);
