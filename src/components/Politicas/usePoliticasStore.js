import { create } from 'zustand';

const usePoliticasStore = create((set) => ({
  isPoliticasOpen: false,
  openPoliticas: () => set({ isPoliticasOpen: true }),
  closePoliticas: () => set({ isPoliticasOpen: false }),
}));

export default usePoliticasStore;
