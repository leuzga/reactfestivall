import styled from 'styled-components';

export const ListContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: auto;
  width: 1050px; 
`;

export const ListHeader = styled.div`
  display: flex;
  background-color: #f5f5f5;
  font-weight: bold;
  padding: 8px;
  border-radius: 4px;
`;

export const ListBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const ListRow = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 4px;
  height: 70px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f9f9f9;
  }

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
`;

export const ListCell = styled.div`
  flex: ${(props) =>
    props.isId ? '0.5' : props.isCantidad || props.isAlquiler ? '0.8' : '1.5'};
  padding: 0 4px;
  border-right: 1px solid #e6e6e6;
  cursor: ${(props) => (props.sortable ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  justify-content: center; /* Centramos el contenido */

  &:last-child {
    border-right: none;
    display: flex;
    justify-content: flex-end;
    padding-right: 8px;
  }
`;

export const AccordionContent = styled.div`
  max-height: ${(props) => (props.isOpen ? '150px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${(props) => (props.isOpen ? '16px' : '0 16px')};
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f9f9f9;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

export const DescriptionTitle = styled.h4`
  color: #888;
  margin-bottom: 8px;
`;
