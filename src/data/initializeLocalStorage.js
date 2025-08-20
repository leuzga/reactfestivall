// data/initializeLocalStorage.js
import { mockUsers } from './mockUsers';

export const initializeLocalStorage = () => {
  try {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(mockUsers));
      console.log('LocalStorage inicializado con datos de ejemplo.');
    }
  } catch (error) {
    console.error('Error al inicializar localStorage:', error);
  }
};

// Ejecutar la inicialización al cargar el módulo
initializeLocalStorage();
