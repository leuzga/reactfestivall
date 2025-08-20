import { atom } from 'jotai';

export const calendarEventsAtom = atom({
  userId: null,
  name: '',
  email: '',
  quantity: 0,
  events: [],
});

export const confirmedReservationsAtom = atom([]);
