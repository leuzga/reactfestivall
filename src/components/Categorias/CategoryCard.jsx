import styled from 'styled-components';
import TooltipCustom from '../TooltipCustom/TooltipCustom';

const CategoryCardContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isSelected'].includes(prop),
})`
  width: 85%;
  max-width: 300px;
  height: 68px;
  border: 3px solid white;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#E9F7EF ' : '#f5e9fc')};
  transition: background-color 0.3s;
  display: flex;
  justify-content: space-between;  /* Cambiado a space-between */
  align-items: center;
  margin: 0 auto 16px;

  &:hover {
    background-color: #d1f2eb;
  }

  @media (min-width: 768px) {
    width: 150px;
    margin: 0;
  }
`;

const CategoryTitle = styled.div`
  font-weight: normal;
  font-size: 14px;
  white-space: normal;
  line-height: 1.5;
  overflow: hidden;
  text-align: center;
  flex: 1;
  color: #5a3ec8
  
`;





const CategoryCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const CategoryCard = ({
  categoryName,
  isSelected,
  onClick,
}) => {
  return (
    <>
      <TooltipCustom content={categoryName}>
        <CategoryCardWrapper>
          <CategoryCardContainer isSelected={isSelected} onClick={onClick}>
            <CategoryTitle>{categoryName}</CategoryTitle>
          </CategoryCardContainer>
        </CategoryCardWrapper>
      </TooltipCustom>
    </>
  );
};

export default CategoryCard;
