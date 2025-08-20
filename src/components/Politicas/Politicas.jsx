import  { useEffect, useState } from 'react';
import usePoliticasStore from './usePoliticasStore';

import {
  ModalOverlay,
  FullScreenModalContentWrapper,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  ModalBody,
} from './Politicas.styled';

const Politicas = () => {
  const { isPoliticasOpen, closePoliticas } = usePoliticasStore();
  const [politicas, setPoliticas] = useState(null);

  useEffect(() => {
    if (isPoliticasOpen) {
      // Cargar el archivo JSON desde la carpeta public
      fetch('/politicas.json')
        .then(response => response.json())
        .then(data => setPoliticas(data[0])) // Suponiendo que solo hay una política
        .catch(error => console.error('Error fetching politicas:', error));
    }
  }, [isPoliticasOpen]);

  return (
    <>
      {isPoliticasOpen && politicas && (
        <ModalOverlay onClick={closePoliticas}>
          <FullScreenModalContentWrapper onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{politicas.titulo}</ModalTitle>
              <CloseButton onClick={closePoliticas}>&times;</CloseButton>
            </ModalHeader>
            <ModalContent>
              <ModalBody>{politicas.descripcion}</ModalBody>
            </ModalContent>
          </FullScreenModalContentWrapper>
        </ModalOverlay>
      )}
    </>
  );
};

export default Politicas;
