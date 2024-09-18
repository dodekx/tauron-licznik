import {
  patchState,
  signalStore,
  type,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntities,
  entityConfig,
  removeEntities,
  removeEntity,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { NgxFileDropEntry } from 'ngx-file-drop';

interface DataRecordState {
  isLoaded: boolean;
  isLoading: boolean;
}
const initialState: DataRecordState = {
  isLoaded: false,
  isLoading: false,
};

const loadEnergyFileStoreConfig = entityConfig({
  entity: type<NgxFileDropEntry>(),
  selectId: (file: NgxFileDropEntry) => file.fileEntry.name,
});

export const loadEnergyDataTauronFileStore = signalStore(
  withState(initialState),
  withEntities<NgxFileDropEntry>(loadEnergyFileStoreConfig),
  withMethods((store) => ({
    addFiles(files: NgxFileDropEntry[]): void {
      patchState(store, addEntities(files, loadEnergyFileStoreConfig));
    },
    removeWrongFilesFromTheList(): void {
      patchState(
        store,
        removeEntities((file) => {
          const filename = file?.fileEntry?.name ?? '';
          return !filename.endsWith('.csv');
        })
      );
    },
  }))
);
