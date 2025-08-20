import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.span`
  visibility: hidden;
  width: max-content;
  max-width: 400px; // Ajusta este valor para cambiar el ancho del tooltip
  background-color: #f3f3f3; // Gris muy claro
  color: #333;
  text-align: center;
  padding: 5px 10px; // Añade padding a los lados
  border-radius: 6px;
  border: 1px solid #795af6; // Bordes redondeados de color #795AF6
  font-size: 10px; // Tamaño de la fuente ajustado a 10px
  position: absolute;
  z-index: 100;
  top: 200%; // Ajusta este valor para mover el tooltip hacia arriba
  left: 50%;
  transform: translateX(-50%);
  white-space: pre-wrap; // Permite que el texto se ajuste al ancho del tooltip
  overflow: hidden; // Asegura que el texto no se desborde
  text-overflow: ellipsis; // Añade puntos suspensivos si el texto es demasiado largo
  display: -webkit-box;
  -webkit-line-clamp: 2; // Limita el texto a 2 líneas
  -webkit-box-orient: vertical;

  ::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #795af6 transparent transparent transparent;
  }

  ${TooltipContainer}:hover & {
    visibility: visible;
  }
`;

const TooltipArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #795af6; // Color de la flecha
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
`;

const Tooltip = ({ children, text }) => (
  <TooltipContainer>
    {children}
    <TooltipText>
      {text}
      <TooltipArrow />
    </TooltipText>
  </TooltipContainer>
);

export default Tooltip;
