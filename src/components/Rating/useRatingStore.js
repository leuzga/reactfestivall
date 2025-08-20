import {create} from 'zustand';

const useRatingStore = create((set) => ({
  juegoId: null,
  setJuegoId: (newId) => set({ juegoId: newId }),
}));

export default useRatingStore;