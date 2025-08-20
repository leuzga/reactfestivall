import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { calendarEventsAtom } from '../../data/Store/eventStore';
import { userAtom } from '../../data/Store/userAtom';
import { useAtom } from 'jotai';
import moment from 'moment';
/* import { obtenerProductos } from '../../data/juegos'; */
import juegos from '../../data/juegos.json';
import DialogEvent from './DialogEvent';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Scheduler.module.css';
import 'moment/locale/es';

moment.locale('es');
const localizer = momentLocalizer(moment);

const Scheduler = ({ selectedGameId, selectedGameName, selectedCantidad, onEventsChange }) => {
  const [events, setEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [user] = useAtom(userAtom);
  const [calendarEvents, setCalendarEvents] = useAtom(calendarEventsAtom);


  useEffect(() => {
    console.log('Calendar events atom state:', calendarEvents); // Verifica el estado del atom
    if (onEventsChange) {
      onEventsChange(events);
    }
  }, [events, onEventsChange, calendarEvents]);

  const handleSelectSlot = ({ start, end }) => {
    const existingEvent = events.find(event => event.gameid === selectedGameId);

    if (existingEvent) {
      console.log('Existing event found:', existingEvent);
      setSelectedEvent(existingEvent);
      setIsDialogOpen(true);
    } else {
      console.log('No existing event found. Opening dialog for new event.');
      setSelectedEvent(null);
      setIsDialogOpen(true);
    }
  };

  const handleDialogSubmit = (data) => {
    console.log('Dialog submit data:', data);

    // Buscar el juego seleccionado en juegos.json
    const selectedGame = juegos.find(juego => juego.id === selectedGameId);

    if (!selectedGame) {
      console.error('Juego no encontrado para calcular el valor de arriendo.');
      return;
    }

    // Asegúrate de que quantity sea un número
    const cantidad = parseInt(data.quantity, 10);
    const valorArriendo = parseFloat(selectedGame.valorArriendo);

    if (isNaN(cantidad) || isNaN(valorArriendo)) {
      console.error('Cantidad o valor de arriendo no válidos.');
      return;
    }

    // Calcular el valor total del arriendo basado en la cantidad proporcionada
    const valorTotalArriendo = cantidad * valorArriendo;

    console.log('Cantidad:', cantidad);
    console.log('Valor Arriendo:', valorArriendo);
    console.log('Valor Total Arriendo:', valorTotalArriendo);

    let updatedEvents;

    if (selectedEvent) {
      updatedEvents = events.map(event =>
        event.id === selectedEvent.id ? {
          ...event,
          ...data,
          valorTotalArriendo // Asegúrate de que el valor total se actualice
        } : event
      );
    } else {
      const newEvent = {
        id: Date.now(),
        ...data,
        gameid: selectedGameId,
        title: selectedGameName,
        userId: user.id,
        userName: user.nombre,
        userEmail: user.email,
        valorTotalArriendo // Añade el valor total del arriendo al nuevo evento
      };
      updatedEvents = [...events, newEvent];
    }

    console.log('Updated events:', updatedEvents);

    setEvents(updatedEvents);
    setCalendarEvents(prev => ({
      ...prev,
      events: updatedEvents,
      email: user.email,
      name: user.nombre,
      quantity: cantidad, // Cantidad seleccionada
      userId: user.id,
      valorTotalArriendo // Valor total del arriendo calculado
    }));

    setIsDialogOpen(false);
  };

  const handleDeleteEvent = (eventId) => {
    console.log('Deleting event with ID:', eventId);
    const updatedEvents = events.filter(event => event.id !== eventId);
    console.log('Updated events after delete:', updatedEvents);
    setEvents(updatedEvents);
    setCalendarEvents(prev => ({
      ...prev,
      events: updatedEvents,
    }));
    setIsDialogOpen(false);
  };

  return (
    <div className={styles.schedulerContainer}>
      <Calendar
        localizer={localizer}
        events={calendarEvents.events}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => {
          console.log('Event selected:', event);
          setSelectedEvent(event);
        }}
        startAccessor='start'
        endAccessor='end'
        className={styles.calendar}
      />
      {isDialogOpen && (
        <DialogEvent
          eventToEdit={selectedEvent}
          setIsDialogOpen={setIsDialogOpen}
          handleDialogSubmit={handleDialogSubmit}
          handleDeleteEvent={handleDeleteEvent}
          isNewEvent={!selectedEvent}
          selectedGameId={selectedGameId}
          selectedGameName={selectedGameName}
          stock={selectedCantidad}
        />
      )}
    </div>
  );
};

export default Scheduler;
