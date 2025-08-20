import { useEffect, useState } from 'react';
import useRatingStore from './useRatingStore';
import useRatingPopup from './useRatingPopup';
import { toast } from 'react-toastify';
import { Button } from '@fluentui/react-components';
import { useStore } from '../../data/Store/store';

const RatingPopup = ({ onClose }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5); // Valoración por defecto de 5
  const [usuarioId, setUsuarioId] = useState(null); // Estado para almacenar el ID del usuario

  const juegoId = useRatingStore((state) => state.juegoId);

  const setCantidadValoracion = useStore(
    (state) => state.setCantidadValoracion
  );

  const {
    data: puntuacion,
    isLoading,
    error,
    enviarValoracion,
  } = useRatingPopup(juegoId);

  useEffect(() => {
    if (isLoading) {
      toast.info('Cargando...', { autoClose: false, toastId: 'ToastyLoad' });
    } else {
      toast.dismiss('ToastyLoad');
    }
    if (error) {
      toast.error('Error al cargar la data');
    }
  }, [isLoading, error]);

  // useEffect(() => {
  //   async function fetchUserId() {
  //     try {
  //       const userEmail = "correo@ejemplo.com"; //Esto me va a servir cuando pueda tener la logica de autenticacion y que sean los usuarios autenticados quienes puedan dejar comentarios
  //       const userId = await getUserIdByEmail(userEmail);
  //       setUsuarioId(userId);
  //     } catch (error) {
  //       console.error('Error al obtener el ID del usuario:', error);
  //     }
  //   }
  //   fetchUserId();
  // }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await enviarValoracion({
        usuario_id: usuarioId,
        juego_id: juegoId,
        valoracion: newRating,
        comentario: newComment,
      });
      setNewComment('');
      setShowCommentForm(false);
      toast.success('Comentario enviado con éxito');
    } catch (error) {
      toast.error('Error al enviar el comentario');
    }
  };

  const comentarioStyle = {
    backgroundColor: '#f5f5f5',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  };

  const nombreStyle = {
    fontWeight: 'bold',
    color: '#333',
  };

  const fechaStyle = {
    fontStyle: 'italic',
    color: '#666',
  };

  const comentarioTextoStyle = {
    marginTop: '5px',
    color: '#333',
  };

  const valoracionStyle = {
    marginTop: '5px',
    color: '#333',
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        backgroundColor: '#f0f0f0',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        width: '500px',
        height: '400px',
        overflowY: 'scroll',
      }}
    >
      <h2
        style={{
          fontSize: '20px',
          fontFamily: 'Segoe UI',
          fontWeight: '700',
          padding: '20px',
        }}
      >
        Comentarios
      </h2>
      {setCantidadValoracion(puntuacion?.cantidad_valoraciones)}

      {puntuacion &&
        (puntuacion.valoraciones.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {puntuacion.valoraciones.map((calificacion) => (
              <li key={calificacion.id} style={comentarioStyle}>
                <p style={nombreStyle}>{calificacion?.nombre}</p>
                <p style={fechaStyle}>{calificacion?.fecha}</p>
                <p style={comentarioTextoStyle}>{calificacion?.comentario}</p>
                <p style={valoracionStyle}>
                  "Valoración: "{calificacion?.valoracion}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Este juego aún no recibe comentarios</p>
        ))}

      {showCommentForm ? (
        <form onSubmit={handleCommentSubmit} style={{ marginTop: '10px' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='Deja tu comentario aquí'
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              borderColor: '#ccc',
            }}
          />
          <Button
            type='submit'
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#795af6',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Enviar Comentario
          </Button>
        </form>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <Button
            onClick={() => setShowCommentForm(true)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#795af6',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Dejar Comentario
          </Button>
          <Button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#795af6',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Cerrar
          </Button>
        </div>
      )}
    </div>
  );
};

export default RatingPopup;
