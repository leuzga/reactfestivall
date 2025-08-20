import { useAtom } from 'jotai';
import { calendarEventsAtom } from '/src/data/Store/eventStore.js';

const useUpdateJotai = () => {
  const [calendarEvents, setCalendarEvents] = useAtom(calendarEventsAtom);

  const selectAndLogEvent = (targetGameId) => {
    const selectedEvent = calendarEvents?.events?.find(
      (event) => event.gameid === Number(targetGameId)
    );
    if (!selectedEvent) {
      console.log(`No se encontró ningún evento con gameid: ${targetGameId}`);
    }
  };

  const removeEvent = (gameId) => {
    setCalendarEvents((currentState) => {
      const updatedEvents = currentState.events.filter(
        (event) => event.gameid !== Number(gameId)
      );

      if (updatedEvents.length === currentState.events.length) {
        console.log(`No se encontró evento con gameid: ${gameId}`);
        return currentState;
      }

      const updatedState = {
        ...currentState,
        events: updatedEvents,
        quantity: updatedEvents.length,
      };

      return updatedState;
    });
  };

  return {
    calendarEvents,
    selectAndLogEvent,
    removeEvent,
  };
};

export default useUpdateJotai;
