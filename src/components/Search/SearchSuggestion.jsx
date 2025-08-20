/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import {
  SearchBox,
  Dropdown,
  Option,
  makeStyles,
  Divider,
  Button,
  useId,
  Toast,
  Toaster,
  ToastTitle,
  ToastBody,
  useToastController,
} from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import useSearchSuggestion from './useSearchSuggestion';
import { TbEyeSearch } from 'react-icons/tb';
import { MdOutlineAutoDelete } from 'react-icons/md';
import useVerificarDisponibilidad from './useVerificarDisponibilidad';
import { useSetAtom, useAtom } from 'jotai';
import { availableGamesAtom } from '../../data/Store/availableStore';
import { drawerOpenAtom } from '../../data/Store/drawerStore';


const localizedStrings = {
  days: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  shortDays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  shortMonths: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ],
  goToToday: 'Ir a hoy',
};

const onFormatDate = (date) => {
  return !date
    ? ''
    : `${
        localizedStrings.months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  padding: 16px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
  padding-left: 16px;
`;

const Subtitle = styled.p`
  font-size: 0.8rem;
  color: #666;
  padding: 16px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`;

const SuggestionDropdown = styled(Dropdown)`
  margin-top: -20px;
`;

const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  position: relative;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const ContainerNote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  color: #765879;
  padding: 16 10;
`;

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  control: {
    maxWidth: '300px',
    marginTop: '-3px',
    padding: '4px',
  },
  clearButton: {
    marginBottom: '5px',
    marginTop: '2px',
  },
});

const SearchSuggestion = () => {
  const customStyles = useStyles();
  const [availableGames, setAvailableGames] = useAtom(availableGamesAtom);
  const {
    mutate:
    data,
    isSuccess,
  } = useVerificarDisponibilidad();
  const [searchTerm, setSearchTerm] = useState('');
  const { suggestions, isLoading } = useSearchSuggestion();
  const Today = new Date();
  const minDate = new Date(
    Today.getFullYear(),
    Today.getMonth(),
    Today.getDate()
  );
  const [showNote, setShowNote] = useState(false);
  const [selectedOption, setSelectedOption] = useState(false);
  const [initialDate, setInitialDate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);
  const initialDateRef = useRef(null);
  const finishDateRef = useRef(null);
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const setOpen = useSetAtom(drawerOpenAtom);

  const showErrorToast = useCallback(() => {
    dispatchToast(
      <Toast>
        <ToastTitle>Error al ingresar la data.</ToastTitle>
        <ToastBody>La fecha de fin debe ser mayor a la de inicio.</ToastBody>
      </Toast>,
      { intent: 'error' }
    );
  }, [dispatchToast]);

  useEffect(() => {
    const dropdown = document.querySelector('.fui-Dropdown');
    if (dropdown) {
      dropdown.style.visibility = 'collapse';
    }
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!searchTerm) return [];
    const searchTermLower = searchTerm.toLowerCase();
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchTermLower)
    );
  }, [searchTerm, suggestions]);

  const handleSearchChange = (event, newValue) => {
    if (newValue !== undefined && newValue !== null) {
      setSelectedOption(newValue.value.toString() !== '');
      setSearchTerm(newValue.value.toString());
    } else {
      setSearchTerm('');
    }
  };

  const handleOptionSelect = (event, data) => {
    setSearchTerm(data.optionValue.toString());
    setSelectedOption(
      data.optionValue.toString() !== ''
        ? false
        : filteredSuggestions.length > 0
    );
    setShowNote(true);
  };

  const handleClear = useCallback(() => {
    setInitialDate(null);
    setFinishDate(null);
    if (initialDateRef.current) initialDateRef.current.value = '';
    if (finishDateRef.current) finishDateRef.current.value = '';
    initialDateRef.current?.focus();
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchTerm || !initialDate || !finishDate) {
      console.error('Datos de búsqueda incompletos');
      return;
    }
  
    // Limpia los juegos disponibles antes de realizar una nueva búsqueda
    setAvailableGames([]);
  
    // Simula que todos los juegos están disponibles para la búsqueda
    const juegosDisponibles = availableGames.filter(juego =>
      juego.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Actualiza el estado de juegos disponibles con los resultados filtrados
    setAvailableGames(juegosDisponibles.map(juego => ({ ...juego, disponible: true })));
    console.log('Disponibilidad simulada:', juegosDisponibles);
  
    // Cierra el Drawer
    setOpen(false);
  
    // Limpia el término de búsqueda y las fechas después de la búsqueda
    setSearchTerm('');
    setInitialDate(null);
    setFinishDate(null);
  }, [searchTerm, initialDate, finishDate, availableGames, setAvailableGames, setOpen]);
  
  
  

  

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const updatedData = data.map((product) => ({
        ...product,
        disponible: true, // Fuerza la disponibilidad a true
      }));
      setAvailableGames(updatedData);
      console.log('Disponibilidad:', updatedData);
    } else {
      console.error('Expected `data` to be an array but got:', data);
    }
    if (isSuccess) {
      setOpen(false);
    }
  }, [data, isSuccess, setAvailableGames, setOpen]); // Asegúrate de que estas dependencias no causen un bucle


  /*  const handleSearch = useCallback(async () => {
    const sendToPost = {
      nombreJuego: searchTerm,
      fechaInicio: formatDateAMD(initialDate),
      fechaFin: formatDateAMD(finishDate),
    };

    try {
      const result = await verificarDisponibilidad(sendToPost);
      console.log("Resultados de disponibilidad:", result);
      setAvailableGames(result);
    } catch (error) {
      console.error("Error al verificar la disponibilidad:", error);
    }
  }, [initialDate, finishDate, searchTerm]);
 */

  const formatDateAMD = (fechaStr) => {
    const fecha = new Date(fechaStr);

    //if (isNaN(fecha.getTime())) throw new Error('Fecha inválida');

    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${año}-${mes}-${dia}`;
  };

  const dateNote = useCallback(
    (date) => {
      return date < formatDateAMD(Today) ? '' : date;
    },
    [Today]
  );

  const isDateDisabled = (date) => {
    return date < minDate;
  };

  const validateDate = (date) => {
    if (initialDate && date < initialDate) {
      showErrorToast();
      setFinishDate(dateNote(formatDateAMD(finishDate)));
      return '';
    }
    return date;
  };

  return (
    <>
      <ContainerText>
        <Title>Buscar</Title>
        <Subtitle>
          Búsqueda rápida de productos, según coincidencia de palabra y/o rango
          de fechas.
        </Subtitle>
      </ContainerText>
      <Divider alignContent='center' appearance='center' />
      <Container>
        <Toaster toasterId={toasterId} position='top' />
        <SearchContainer>
          <SearchBox
            className={customStyles.root}
            placeholder='Buscar...'
            value={searchTerm}
            onChange={(e, newValue) => handleSearchChange(e, newValue)}
          />
          <SuggestionDropdown
            className={`${customStyles.root}`}
            size='small'
            appearance='underline'
            disabled={!searchTerm || isLoading}
            open={searchTerm !== '' && selectedOption}
            onOptionSelect={handleOptionSelect}
          >
            {filteredSuggestions.map((option) => (
              <Option key={option}>{option}</Option>
            ))}
          </SuggestionDropdown>
        </SearchContainer>
        <DatePicker
          ref={initialDateRef}
          onSelectDate={(date) => setInitialDate(date)}
          value={initialDate}
          isDateDisabled={isDateDisabled}
          minDate={minDate}
          strings={localizedStrings}
          className={customStyles.control}
          formatDate={onFormatDate}
          placeholder='Selecciona una fecha...'
        />
        <DatePicker
          ref={finishDateRef}
          onSelectDate={(date) => setFinishDate(validateDate(date))}
          value={finishDate}
          isDateDisabled={isDateDisabled}
          minDate={minDate}
          strings={localizedStrings}
          className={customStyles.control}
          formatDate={onFormatDate}
          placeholder='Selecciona una fecha...'
        />
        <ContainerButtons>
          <Button
            onClick={handleClear}
            appearance='primary'
            className={customStyles.clearButton}
            icon={<MdOutlineAutoDelete />}
          >
            Limpiar
          </Button>
          <Button
            onClick={handleSearch}
            appearance='primary'
            className={customStyles.clearButton}
            icon={<TbEyeSearch />}
          >
            Buscar
          </Button>
        </ContainerButtons>
      </Container>
      <Divider alignContent='center' appearance='center' />
      {showNote && (
        <ContainerNote>
          {`La consulta busca el juego/s en una fecha o rango de fechas, el resultado será:  el juego o juegos que estan disponibles para arriendo`}
        </ContainerNote>
      )}
    </>
  );
};

export default SearchSuggestion;
