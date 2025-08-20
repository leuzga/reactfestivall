import { mockJuegos } from "./mockJuegos";

export const initializeJuegosStorage = () => {
  try {
    if (!localStorage.getItem('juegos')) {
      localStorage.setItem('juegos', JSON.stringify(mockJuegos));
      console.log('LocalStorage de juegos inicializado con datos de ejemplo.');
    }
  } catch (error) {
    console.error('Error al inicializar el localStorage de juegos:', error);
  }
};

// Ejecutar la inicialización al cargar el módulo
initializeJuegosStorage();
