import { useState, useEffect } from 'react';
import styles from './EditCategoryForm.module.css';
import { actualizarCategoria } from '../../data/dataService';
import styled from 'styled-components';

export const InlineInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #f5e9fc;
  }
`;

export const InlineSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #f5e9fc;
  }
`;

export const InlineTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #f5e9fc;
  }
`;

const EditCategoryForm = ({ categoria, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img_url, setImgUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (categoria) {
      setTitle(categoria.title);
      setDescription(categoria.description);
      setImgUrl(categoria.img_url);
    }
  }, [categoria]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!title || !description || !img_url) {
      setError('Por favor complete todos los campos.');
      return;
    }
  
    const categoriaActualizada = {
      ...categoria,
      title,
      description,
      img_url,
    };
  
    console.log('Datos enviados para actualizar:', categoriaActualizada);
  
    try {
      await actualizarCategoria(categoriaActualizada);
      onSave(categoriaActualizada);  // Actualiza la lista de categorías
    } catch (error) {
      setError(
        error.message || 'Error al actualizar la categoría. Inténtelo de nuevo.'
      );
      console.error('Error al actualizar la categoría:', error);
    }
  };
  

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.formContainer}>
        {error && <p className={styles.error}>{error}</p>}
        <form
          className={styles.form}
          onSubmit={handleFormSubmit}
          id='edit-category-form'
        >
          <div className={styles.inputContainer}>
            <label htmlFor='title' className={styles.label}>
              Nombre:
            </label>
            <InlineInput
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${styles.input} ${styles.textInput}`}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='description' className={styles.label}>
              Descripción:
            </label>
            <InlineTextArea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} ${styles.textAreaInput}`}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='img_url' className={styles.label}>
              URL de la Imagen:
            </label>
            <InlineInput
              type='text'
              id='img_url'
              value={img_url}
              onChange={(e) => setImgUrl(e.target.value)}
              className={`${styles.input} ${styles.textInput}`}
              required
            />
            {img_url && (
              <img
                src={img_url}
                alt='Imagen proporcionada'
                className={styles.imagePreview}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryForm;
