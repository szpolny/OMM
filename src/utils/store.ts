import { Store } from '@tauri-apps/plugin-store';

export const getDataStore = async (): Promise<Store> => {
  return await Store.load('data.json');
};
