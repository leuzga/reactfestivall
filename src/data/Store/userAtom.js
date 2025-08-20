// src/data/Store/userAtom.js
import { atom } from 'jotai';

// Define el átomo del usuario con datos iniciales
export const userAtom = atom(() => {
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : { userId: null, name: '', email: '', accountType: '' };
});

// Define un átomo para actualizar el estado del usuario
export const setUserAtom = atom(null, (get, set, user) => {
  set(userAtom, user);
  localStorage.setItem('currentUser', JSON.stringify(user)); // Guarda los datos actualizados en localStorage
});
