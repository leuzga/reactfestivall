import  { useEffect, useState } from "react";
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Toaster,
  useToastController,
  Toast,
  tokens,
  ToastTitle,
  ToastBody,
  makeStyles,
  Divider,
  Spinner,
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
} from "@fluentui/react-components";
import { useAtom } from "jotai";
import { calendarEventsAtom, confirmedReservationsAtom } from "../../data/Store/eventStore";
import { useId } from "react";
import { Link } from "react-router-dom";



const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    rowGap: "15px",
    padding: "50px 100px",
    backgroundColor: tokens.colorNeutralBackground1,
    fontSize: "15px",
    height: "100vh", // Establecer altura a 100vh
    "@media (max-width: 600px)": {
      padding: "20px",
      fontSize: "12px",
    },
  },
  detail: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5px",
  },
  detailDate: {
    display: "flex",
    flexDirection: "row",
    columnGap: "12px",
    marginBottom: "10px",
  },
  total: {
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    columnGap: "12px",
    justifyContent: "center",
    marginTop: "20px",
  },
  title: {
    fontSize: "25px",
    padding: "30px 100px",
    "@media (max-width: 600px)": {
      padding: "20px",
      fontSize: "25px",
    },
  },
  bold: {
    fontWeight: "bold",
  },
  italicText: {
    fontStyle: "italic",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    fontSize: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  messageBar: {
    width: "80%",
    padding: "20px",
    marginBottom: "20px",
    "@media (max-width: 600px)": {
      width: "80%",
      fontSize: "12px",
    },
  },
  messageRe: {
    "@media (max-width: 600px)": {
      width: "50%",
      fontSize: "12px",
    },
  },
});

const formatDateAMD = (fechaStr) => {
  const fecha = new Date(fechaStr);
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${año}-${mes}-${dia}`;
};

const calculateTotalEvents = (events) => {
  return events ? events.length : 0;
};

const ReservationsDetail = () => {
  const styles = useStyles();
  const [calendarEvents] = useAtom(calendarEventsAtom);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isReservationConfirmed, setReservationConfirmed] = useState(false);
  const [confirmedReservations, setConfirmedReservations] = useAtom(confirmedReservationsAtom);
  const [isSubmitting, setSubmitting] = useState(false);
  const toasterId = useId();
  const { dispatchToast } = useToastController(toasterId);

  useEffect(() => {
    setTimeout(() => {
      if (calendarEvents && calendarEvents.events && calendarEvents.events.length > 0) {
        setUser(calendarEvents);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 1500);
  }, [calendarEvents]);

  const handleSubmit = () => {
    setDialogOpen(true);
  };

  const handleConfirm = async () => {
    setSubmitting(true);
  
    const reservationData = {
      nombre: user.name,
      email: user.email,
      reservasDTO: user.events.map((event) => ({
        tituloJuego: event.title,
        fechaInicio: formatDateAMD(event.start),
        fechaFin: formatDateAMD(event.end),
        cantidad: event.quantity,
        valorTotalArriendo: event.valorTotalArriendo
      })),
    };
  
    try {
      // Simula la respuesta como si fuera un servidor
      setTimeout(() => {
        setConfirmedReservations((prevReservations) => [...prevReservations, reservationData]);
  
        setDialogOpen(false);
        dispatchToast(
          <Toast>
            <ToastTitle>Reserva Confirmada</ToastTitle>
            <ToastBody>La reserva ha sido confirmada exitosamente.</ToastBody>
          </Toast>,
          { intent: "success" }
        );
  
        setReservationConfirmed(true);
      }, 1000); // Simula un retraso
    } catch (error) {
      dispatchToast(
        <Toast>
          <ToastTitle>Error en la Reserva</ToastTitle>
          <ToastBody>Hubo un problema al confirmar la reserva.</ToastBody>
        </Toast>,
        { intent: "error" }
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Cargando eventos..." />
      </div>
    );
  }

  if (!user || !user.events || user.events.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <MessageBar intent="warning" className={styles.messageBar}>
          <MessageBarBody>
            <MessageBarTitle className={styles.messageRe}>
              No se encontraron eventos para mostrar.
            </MessageBarTitle>
          </MessageBarBody>
        </MessageBar>
      </div>
    );
  }

  const totalEvents = calculateTotalEvents(user.events);

  return (
    <>
      <h1 className={styles.title}>Mis Reservas</h1>
      <div className={styles.root}>
        {isReservationConfirmed ? (
          <div className={styles.container}>
            <MessageBar intent="success" className={styles.messageBar}>
              <MessageBarBody>
                <MessageBarTitle className={styles.messageRe}>
                  Reserva Registrada Exitosamente
                </MessageBarTitle>
                ¡Tu reserva ha sido confirmada con éxito!
              </MessageBarBody>
            </MessageBar>
          </div>
        ) : (
          <>
            <div className={styles.detail}>
              <span className={styles.bold}>Usuario:</span>
              <span>{user.name}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.bold}>Email:</span>
              <span className={styles.italicText}>{user.email}</span>
            </div>
            <Divider />
            {user.events.length > 0 ? (
              user.events.map((event, index) => (
                <div className={styles.detail} key={index}>
                  <span>{event.title}</span>
                  <div className={styles.detailDate}>
                    <span className={styles.bold}>Inicio:</span>
                    <span>{formatDateAMD(event.start)}</span>
                    <span className={styles.bold}>Fin:</span>
                    <span>{formatDateAMD(event.end)}</span>
                    <span className={styles.bold}>Cantidad:</span>  
                    <span>{event.quantity}</span>
                  </div>
                </div>
              ))
            ) : (
              <div>No hay eventos para mostrar.</div>
            )}
            <Divider />
            
            {user.events.length > 0 ? (
              user.events.map((event, index) => (
                <div className={styles.detail} key={index}>
                  <span>Total:</span>
                  <div className={styles.detailDate}>
                    <span className={styles.bold}>${event.valorTotalArriendo}</span>  
                  </div>
                </div>
              ))
            ) : (
              <div>No hay eventos para mostrar.</div>
            )}
              
           
            <div className={styles.buttonContainer}>
              <Link to={`/detalle/${user.events[0].gameid}`}>
                <Button appearance="primary">Agregar más juegos</Button>
              </Link>
              <Button appearance="primary" onClick={handleSubmit}>
                Reservar
              </Button>
            </div>
          </>
        )}

        <Dialog
          open={isDialogOpen}
          onOpenChange={(_, { open }) => setDialogOpen(open)}
        >
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Confirmar Reserva</DialogTitle>
              <DialogContent>
                ¿Estás seguro de que deseas confirmar la reserva?
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
                {isSubmitting && <Spinner size="small" />}
                <Button
                  appearance="primary"
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                >
                  Confirmar
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>

        <Toaster toasterId={toasterId} />
      </div>
    </>
  );
};

export default ReservationsDetail;



