import { useState } from "react";
import styles from "./EditUserForm.module.css";

import styled from "styled-components";

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

const EditUserForm = ({ user, onSave }) => {
  const [userData, setUserData] = useState(user || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(userData);
  };

  return (
    <form
      id="edit-user-form"
      className={styles.formContainer}
      onSubmit={handleSubmit}
    >
      <div className={styles.inputGroup}>
        <label className={styles.label}>ID:</label>
        <InlineInput
          type="text"
          value={userData.id}
          className={styles.input}
          disabled
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Nombre:</label>
        <InlineInput
          type="text"
          name="nombre"
          value={userData.nombre}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Apellido:</label>
        <InlineInput
          type="text"
          name="apellido"
          value={userData.apellido}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Email:</label>
        <InlineInput
          type="email"
          name="email"
          value={userData.email}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Teléfono:</label>
        <InlineInput
          type="text"
          name="telefono"
          value={userData.telefono}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Dirección:</label>
        <InlineInput
          type="text"
          name="direccion"
          value={userData.direccion}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Password:</label>
        <InlineInput
          type="password"
          name="password"
          value={userData.password}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default EditUserForm;
