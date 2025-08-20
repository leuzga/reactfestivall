import { useState } from 'react';
import styles from './RegistrarCategoria.module.css';
import { agregarCategoria } from '../../data/dataService';
import { ToastContainer, toast } from 'react-toastify';
import {
  Button,
} from "@fluentui/react-components";


import styled from "styled-components";
const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
const RegistrarCategoria = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado de recargar la página
    if (!titulo || !descripcion || !imagen) {
      setMensaje('Por favor complete todos los campos.');
      return;
    }
  
    const nuevaCategoria = {
      title: titulo,
      description: descripcion,
      img_url: imagen
    };
  
    try {
      await agregarCategoria(nuevaCategoria);
      setTitulo('');
      setDescripcion('');
      setImagen('');
      toast.success("Catergoria registrada exitosamente!");
    } catch (error) {
      setMensaje('Error al registrar la categoría.');
    }
  };

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      // Creamos un objeto URL para la imagen seleccionada
      const imageUrl = URL.createObjectURL(file);
      setImagen(imageUrl);
    }
  };
  
  return (
    <div className={styles.containerPrincipal}>
    <ToastContainer position="top-center"/>
      <div className={styles.container}>
        <h2 className={styles.titleForm}>Registrar Categoría</h2>
        {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
        <form className={styles.form}>
          <div className={styles.generalInfo}>
            <div className={styles.inputContainer}>
              <label htmlFor="titulo" className={styles.label}>Título:</label>
              <input
                type="text"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="descripcion" className={styles.label}>Descripción:</label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className={styles.textarea}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="imagen" className={styles.label}>Imagen:</label>
              <input
                type="file"
                accept="image/*"
                id="imagen"
                onChange={handleImagenChange}
                className={styles.input}
                required
              />
            </div>
          </div>
          <SubmitButton appearance='primary' type="button" onClick={handleFormSubmit} className={styles.submitButton}>Guardar Categoría</SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default RegistrarCategoria;



