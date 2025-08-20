import React, { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import useAdminListCaracteristicas from "./useAdminListCaracteristicas";
import "react-toastify/dist/ReactToastify.css";
import {
  ListContainer,
  ListHeader,
  ListBody,
  ListRow,
  ListCell,
  IconButton,
} from "./AdminListCaract.style";
import { eliminarCaracteristica, actualizarCaracteristica } from "../../data/caracteristicas";
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@fluentui/react-components";
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

const AdminListCaracteristicas = () => {
  const { data, isLoading, error } = useAdminListCaracteristicas();
  const [datos, setDatos] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCaracteristica, setCurrentCaracteristica] = useState({ id: null, nombre: "" });
  const [caracteristicaAEliminar, setCaracteristicaAEliminar] = useState(null);

  useEffect(() => {
    if (isLoading) {
      toast.info("Cargando...", { autoClose: false, toastId: "ToastyLoad" });
    } else {
      toast.dismiss("ToastyLoad");
    }
    if (error) {
      toast.error("Error al cargar las caracteristicas");
    }
    if (data) {
      setDatos(data);
    }
  }, [isLoading, error, data]);

  const handleRowClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDeleteClick = (e, carac) => {
    e.stopPropagation();
    setCaracteristicaAEliminar(carac);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await eliminarCaracteristica(caracteristicaAEliminar.id);
      setDatos((prevData) => prevData.filter((carac) => carac.id !== caracteristicaAEliminar.id));
      toast.success("Característica eliminada correctamente");
    } catch (error) {
      toast.error("Error al eliminar la característica");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditClick = (e, carac) => {
    e.stopPropagation();
    setCurrentCaracteristica(carac);
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    setCurrentCaracteristica({ ...currentCaracteristica, nombre: e.target.value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const updatedCarac = await actualizarCaracteristica(currentCaracteristica.id, currentCaracteristica.nombre);
      setDatos((prevData) =>
        prevData.map((carac) =>
          carac.id === updatedCarac.id ? updatedCarac : carac
        )
      );
      toast.success("Característica actualizada correctamente");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Error al actualizar la característica");
    }
  };

  return (
    <ListContainer>
      <ListHeader>
        <ListCell>ID</ListCell>
        <ListCell>Nombre</ListCell>
        <ListCell>Acciones</ListCell>
      </ListHeader>
      <ListBody>
        {datos &&
          datos.map((carac, index) => (
            <React.Fragment key={carac.id}>
              <ListRow
                onClick={() => handleRowClick(index)}
                isOdd={index % 2 !== 0}
              >
                <ListCell>{carac.id}</ListCell>
                <ListCell>{carac.nombre}</ListCell>
                <ListCell>
                  <IconButton onClick={(e) => handleEditClick(e, carac)}>
                    <AiFillEdit />
                  </IconButton>
                  <IconButton onClick={(e) => handleDeleteClick(e, carac)}>
                    <AiFillDelete />
                  </IconButton>
                </ListCell>
              </ListRow>
            </React.Fragment>
          ))}
      </ListBody>
      <ToastContainer position="top-center" />

      <Dialog open={isEditModalOpen} onDismiss={() => setIsEditModalOpen(false)}>
        <DialogSurface style={{ width: '98%', padding: '15px 30px 15px 30px' }}>
          <DialogBody>
            <DialogTitle>Editar Característica</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSaveChanges}>
                <label style={{ fontWeight: 'bold' }}>
                  Nombre:
                  <InlineInput
                    type="text"
                    value={currentCaracteristica.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <DialogActions>
                  <Button appearance="primary" onClick={() => setIsEditModalOpen(false)}>Cerrar</Button>
                  <Button appearance="primary" type="submit">Guardar Cambios</Button>
                </DialogActions>
              </form>
            </DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onDismiss={() => setIsDeleteModalOpen(false)}>
        <DialogSurface style={{ width: '98%', padding: '15px 30px 15px 30px' }}>
          <DialogBody>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
              <p>¿Estás seguro de que deseas eliminar la característica <strong>{caracteristicaAEliminar?.nombre}</strong>?</p>
            </DialogContent>
            <DialogActions>
              <Button appearance="primary" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
              <Button appearance="primary" onClick={confirmDelete}>Eliminar</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </ListContainer>
  );
};

export default AdminListCaracteristicas;


