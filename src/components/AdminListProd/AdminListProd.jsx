import * as React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components';
import { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import {
  ListContainer,
  ListHeader,
  ListBody,
  ListRow,
  ListCell,
  AccordionContent,
  IconButton,
  DescriptionTitle,
} from './AdminListProd.style';
import useAdminListProd from './useAdminListProd';
import { eliminarProducto } from '../../data/juegos';
import EditProductForm from './EditProductForm';

const AdminListProd = () => {
  const [datos, setDatos] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productoActual, setProductoActual] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const { data, isLoading, error } = useAdminListProd();

  useEffect(() => {
    if (isLoading) {
      toast.info('Cargando...', { autoClose: false, toastId: 'ToastyLoad' });
    } else {
      toast.dismiss('ToastyLoad');
    }
    if (error) {
      toast.error('Error al cargar la data');
    }
    if (data) {
      setDatos(data);
    }
  }, [isLoading, error, data]);

  const toggleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  const handleEditClick = (producto) => {
    'Editando producto:', producto;
    setProductoActual(producto);
    toggleEditModal();
  };

  const handleRowClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDeleteClick = (e, producto) => {
    e.stopPropagation();
    setProductoAEliminar(producto);
    toggleDeleteModal();
  };

  const confirmDelete = async () => {
    try {
      await eliminarProducto(productoAEliminar.id);
      setDatos((prevData) =>
        prevData.filter((producto) => producto.id !== productoAEliminar.id)
      );
      toast.success('Producto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
      toast.error('Error al eliminar el producto.');
    } finally {
      toggleDeleteModal();
    }
  };

  const handleUpdateProduct = (productoActualizado) => {
    setDatos((prevDatos) => {
      return prevDatos.map((producto) =>
        producto.id === productoActualizado.id ? productoActualizado : producto
      );
    });
    toggleEditModal();
    toast.success('Producto actualizado correctamente');
  };

  return (
    <ListContainer>
      <ListHeader>
        <ListCell>ID</ListCell>
        <ListCell>Nombre</ListCell>
        <ListCell>Largo (Metros)</ListCell>
        <ListCell>Ancho (Metros)</ListCell>
        <ListCell>Altura (Metros)</ListCell>
        <ListCell>Capacidad</ListCell>
        <ListCell>Valor de Arriendo</ListCell>
        <ListCell>Cantidad</ListCell>
        <ListCell>Categoría</ListCell>
        <ListCell>Imagen</ListCell>
        <ListCell>Acciones</ListCell>
      </ListHeader>
      <ListBody>
        {datos &&
          datos.map((producto, index) => (
            <React.Fragment key={producto.id}>
              <ListRow onClick={() => handleRowClick(index)}>
                <ListCell>{producto.id}</ListCell>
                <ListCell>{producto.nombre}</ListCell>
                <ListCell>{producto.largo}</ListCell>
                <ListCell>{producto.ancho}</ListCell>
                <ListCell>{producto.altura}</ListCell>
                <ListCell>{producto.capacidad}</ListCell>
                <ListCell>{producto.valorArriendo}</ListCell>
                <ListCell>{producto.cantidad}</ListCell>
                <ListCell>{producto.tipo?.title || 'N/A'}</ListCell>
                <ListCell>
                  <img
                    src={producto.img_urls[0]}
                    alt='imagen'
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'path_to_fallback_image';
                    }}
                  />
                </ListCell>
                <ListCell>
                  <IconButton onClick={() => handleEditClick(producto)}>
                    <AiFillEdit />
                  </IconButton>
                  <IconButton onClick={(e) => handleDeleteClick(e, producto)}>
                    <AiFillDelete />
                  </IconButton>
                </ListCell>
              </ListRow>
              <AccordionContent isOpen={openIndex === index}>
                <DescriptionTitle>Descripción:</DescriptionTitle>
                <p>{producto.descripcion}</p>
              </AccordionContent>
            </React.Fragment>
          ))}
      </ListBody>
      <ToastContainer position='top-center' />
      <Dialog open={isEditOpen} onDismiss={toggleEditModal}>
        <DialogSurface style={{ width: '98%', padding: '15px 30px 15px 30px' }}>
          <DialogBody>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogContent>
              <EditProductForm
                producto={productoActual}
                onSave={handleUpdateProduct}
              />
            </DialogContent>
            <DialogActions>
              <Button appearance='primary' onClick={toggleEditModal}>
                Cerrar
              </Button>
              <Button
                appearance='primary'
                form='edit-product-form'
                type='submit'
              >
                Guardar Cambios
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      <Dialog open={isDeleteOpen} onDismiss={toggleDeleteModal}>
        <DialogSurface style={{ width: '98%', padding: '15px 30px 15px 30px' }}>
          <DialogBody>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
              <p>
                ¿ Estás seguro de que deseas eliminar{' '}
                <strong>{productoAEliminar?.nombre}</strong> ?
              </p>
            </DialogContent>
            <DialogActions>
              <Button appearance='primary' onClick={toggleDeleteModal}>
                Cancelar
              </Button>
              <Button appearance='primary' onClick={confirmDelete}>
                Eliminar
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </ListContainer>
  );
};

export default AdminListProd;
