import * as React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Label,
  makeStyles,
} from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { useAuth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { cartCountAtom } from '../../data/Store/cartCountAtom';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

const DialogEvent = ({
  eventToEdit,
  setIsDialogOpen,
  handleDialogSubmit,
  handleDeleteEvent,
  isNewEvent,
  selectedGameId,
  selectedGameName,
  stock,
}) => {
  const styles = useStyles();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [start, setStart] = React.useState(eventToEdit?.start || null);
  const [end, setEnd] = React.useState(eventToEdit?.end || null);
  const [quantity, setQuantity] = React.useState(eventToEdit?.quantity || 1);
  const [cartCount, setCartCount] = useAtom(cartCountAtom); // Estado global del contador del carrito

  const Today = new Date();
  const minDate = new Date(Today.getFullYear(), Today.getMonth(), Today.getDate());

  const isDateDisabled = (date) => {
    return date < new Date(new Date().setHours(0, 0, 0, 0));
  };

  React.useEffect(() => {
    setStart(eventToEdit?.start || null);
    setEnd(eventToEdit?.end || null);
  }, [eventToEdit]);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const newEvent = {
      id: isNewEvent ? Date.now() : eventToEdit?.id,
      title: selectedGameName,
      start: start || eventToEdit?.start,
      end: end || eventToEdit?.end,
      gameid: selectedGameId,
      quantity,
    };

    handleDialogSubmit(newEvent);

    // Incrementar el contador del carrito al agregar una nueva reserva
    setCartCount(cartCount + quantity); // Sumar la cantidad seleccionada al carrito
  };

  const handleDelete = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
  
    if (eventToEdit) {
      // Restar la cantidad del evento que se está eliminando
      const newCartCount = cartCount - eventToEdit.quantity;
  
      // Llamar a la función para eliminar el evento
      handleDeleteEvent(eventToEdit.id);
  
      // Actualizar el contador del carrito
      setCartCount(Math.max(0, newCartCount)); // Asegúrate de que no sea menor que 0
    }
  };

  return (
    <Dialog open={true} onClose={() => handleClose()}>
      <DialogSurface aria-describedby={undefined}>
        <form>
          <DialogBody>
            <DialogTitle>Solicitud de Reserva</DialogTitle>
            <DialogContent className={styles.content}>
              <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                {selectedGameName}
              </p>
              <Label required htmlFor='start-input'>
                Fecha de Inicio
              </Label>
              <DatePicker
                onSelectDate={(date) => setStart(date)}
                value={start}
                ariaLabel='Seleccione una fecha de inicio'
                isDateDisabled={isDateDisabled}
                minDate={minDate}
                style={{ height: '40px' }}
              />
              <Label required htmlFor='end-input'>
                Fecha de Fin
              </Label>
              <DatePicker
                onSelectDate={(date) => setEnd(date)}
                value={end}
                ariaLabel='Seleccione una fecha de fin'
                isDateDisabled={isDateDisabled}
                minDate={minDate}
                style={{ height: '40px' }}
              />
              <Label required htmlFor='quantity-input'>
                Cantidad
              </Label>
              <input
                type='number'
                id='quantity-input'
                min='1'
                max={stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(stock, Math.max(1, e.target.value)))}
                style={{ height: '40px', width: '100%' }}
              />
              <p style={{ color: 'red' }}>
                Máximo disponible: {stock}
              </p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} appearance='secondary' style={{ height: '40px', marginTop: '20px' }}>
                Cerrar
              </Button>
              {!isNewEvent && (
                <Button onClick={handleDelete} appearance='danger' style={{ height: '40px', marginTop: '20px' }}>
                  Eliminar
                </Button>
              )}
              <Button onClick={handleSubmit} appearance='primary' style={{ height: '40px', marginTop: '20px' }}>
                {isNewEvent ? 'Agregar' : 'Actualizar'}
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default DialogEvent;
