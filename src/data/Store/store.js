import { create } from 'zustand';

export const useStore = create((set) => ({
  cantidadValoracion: 0,
  setCantidadValoracion: (valor) => set({ cantidadValoracion: valor }),
}));
