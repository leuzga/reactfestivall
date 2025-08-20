import { useAtom } from 'jotai';
import { confirmedReservationsAtom } from '../../data/Store/eventStore';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Styles from './Reservas.module.css';
import { useAuth } from '../AuthContext/AuthContext';
const variants = {
  open: {
    y: 1,
    opacity: 1,
    transition: {
      y: { stiffness: 100, damping: 10 },
    },
  },
  closed: {
    y: 10,
    opacity: 0.5,
    transition: {
      y: { stiffness: 100, damping: 10 },
      opacity: { duration: 1 },
    },
  },
};

const ReservaItem = ({ reserva }) => {
  const { tituloJuego, cantidad, fechaInicio, fechaFin } = reserva;

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 1 }}
      className={Styles.juegoContenedor}
    >
      <div className={Styles.textContainer}>
        <h2 className={Styles.juegoNombre}>{tituloJuego}</h2>
        <p className={Styles.juegoDetalles}>
          <strong>Cantidad:</strong> {cantidad}
        </p>
        <p className={Styles.juegoDetalles}>
          <strong>Fecha de inicio:</strong> {format(new Date(fechaInicio), 'dd/MM/yyyy')}
        </p>
        <p className={Styles.juegoDetalles}>
          <strong>Fecha de fin:</strong> {format(new Date(fechaFin), 'dd/MM/yyyy')}
        </p>
      </div>
    </motion.li>
  );
};

const Reservas = () => {
  const [confirmedReservations] = useAtom(confirmedReservationsAtom);
  const { isAuthenticated } = useAuth(); // Solo necesitamos verificar si el usuario está autenticado

  if (!isAuthenticated) {
    return <p>Por favor, inicie sesión para ver sus reservas.</p>;
  }

  if (confirmedReservations.length === 0) {
    return <div className={Styles.noReservas}>No tienes reservas confirmadas.</div>;
}

  return (
    <div className={Styles.granContenedor}>
      <h2 className={Styles.title1}>Reservas confirmadas</h2>
      <ul className={Styles.projectList}>
        {confirmedReservations.map((reserva, index) =>
          reserva.reservasDTO.map((detalle, idx) => (
            <ReservaItem key={`${index}-${idx}`} reserva={detalle} />
          ))
        )}
      </ul>
    </div>
  );
};

export default Reservas;
