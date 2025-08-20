import SearchSuggestion from './SearchSuggestion';
import styled from 'styled-components';

const SearchBoxContainer = styled.div`
  position: relative;
`;

const SearchForm = () => {
  return (
    <SearchBoxContainer>
      <SearchSuggestion />
    </SearchBoxContainer>
  );
};

export default SearchForm;
