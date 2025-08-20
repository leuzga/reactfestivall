import { useState } from 'react';
import {
  Dialog,
  DialogBody,
  DialogTitle,
  DialogActions,
  Button,
  DialogSurface,
} from '@fluentui/react-components';
import {
  Menu as MenuInner,
  MenuItem,
  MenuButton,
  MenuDivider,
} from '@szhsin/react-menu';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import { calendarEventsAtom } from '../../data/Store/eventStore';

const menuShow = keyframes`
  from {
    opacity: 0;
  }
`;

const menuHide = keyframes`
  to {
    opacity: 0;
  }
`;

const Menu = styled(MenuInner)`
  .szh-menu {
    min-width: 8rem;
    &--state-opening {
      animation: ${menuShow} 0.15s ease-out;
    }
    &--state-closing {
      animation: ${menuHide} 0.2s ease-out forwards;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 8px;
  justify-content: center;
  color: #828282;
`;

import '@szhsin/react-menu/dist/index.css';

const MenuAvatar = () => {
  const { logout } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [, setCalendarEvents] = useAtom(calendarEventsAtom);

  // Obtener el usuario desde localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));

  // Debugging
  console.log('Stored user:', storedUser);

  const nombre = storedUser?.nombre ? storedUser.nombre : 'Usuario';
  const apellido = storedUser?.apellido ? storedUser.apellido : '';

  // Debugging
  console.log('Nombre:', nombre);
  console.log('Apellido:', apellido);

  const handleLogoutClick = () => {
    setIsDialogOpen(true);
  };

  const confirmLogout = () => {
    // Limpia el localStorage y otros datos
    localStorage.removeItem('user');
    localStorage.removeItem('accountType');
    
    // Limpia el estado global de eventos
    setCalendarEvents({
      events: [],
      email: '',
      name: '',
      userId: '',
    });

    logout(); // Llama a la función logout que maneja la lógica
    setIsDialogOpen(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Menu
        style={{ display: 'flex', flexDirection: 'row', gap: 'none' }}
        transition
        menuButton={
          <MenuButton style={{ borderRadius: '8px', border: 'none', padding: '8px' }}>
            <Container>
              <p style={{ fontSize: '14px', margin: '0' }}>{nombre}</p>
              {apellido && <p style={{ fontSize: '14px', margin: '0' }}>{apellido}</p>}
            </Container>
          </MenuButton>
        }
      >
        <MenuItem>Perfil</MenuItem>
        <MenuItem>
          <Link to='/favoritos' style={{ textDecoration: 'none', color: 'inherit' }}>
            Favoritos
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/reservas' style={{ textDecoration: 'none', color: 'inherit' }}>Mis reservas</Link>
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={handleLogoutClick}>LogOut</MenuItem>
      </Menu>

      <Dialog open={isDialogOpen} onDismiss={cancelLogout}>
        <DialogSurface style={{ width: '98%', padding: '15px 30px' }}>
          <DialogBody>
            <DialogTitle>Confirmar Cierre de Sesión</DialogTitle>
            <p style={{  width: '400px',padding: '30px' }}>¿Estás seguro de que deseas cerrar sesión, <strong>{nombre}</strong>?</p>
          </DialogBody>
          <DialogActions>
            <Button appearance='secondary' onClick={cancelLogout}>Cancelar</Button>
            <Button appearance='primary' onClick={confirmLogout}>Cerrar Sesión</Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </>
  );
};

export default MenuAvatar;
