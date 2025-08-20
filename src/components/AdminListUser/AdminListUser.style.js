import styled from "styled-components";

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
  height: 100px;
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
  flex: ${({ isId, isCantidad, isAlquiler }) =>
    isId || isCantidad || isAlquiler ? "0 0 100px" : "1"};
  padding: 0 8px;
  cursor: ${({ sortable }) => (sortable ? "pointer" : "default")};
`;

export const AccordionContent = styled.div`
  max-height: ${(props) => (props.isOpen ? "150px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${(props) => (props.isOpen ? "16px" : "0 16px")};
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: inline-flex;
  align-items: center;
`;

export const DescriptionTitle = styled.h4`
  margin: 0 0 8px;
  font-weight: bold;
`;
