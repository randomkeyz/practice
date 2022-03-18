import styled from 'styled-components';

const StyledSearch = styled.input`
    width: 100%;
    border-radius: 0.4em;
    border: 1px solid #D4D4D4;
    padding: 0.4em 0.7em;
`;

const Search = () => {
    return ( 
        <StyledSearch placeholder='Search cryptos' />
    );
}

export default Search;