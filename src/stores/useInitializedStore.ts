import { create } from 'zustand';

interface InitializedStore {
  loading: boolean;
  initialized: boolean | null;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
}

const useInitializedStore = create<InitializedStore>((set) => ({
  loading: true,
  initialized: null,
  setLoading: (loading) => {
    set({ loading });
  },
  setInitialized: (initialized) => {
    set({ initialized });
  },
}));

export default useInitializedStore;
