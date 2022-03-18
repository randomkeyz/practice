import styled from 'styled-components';

const StyledTitle = styled.h1`
    font-size: 1.5em;
    text-align: center;
    margin: 1em 0;
`;

const Title = () => {
    return ( 
        <StyledTitle>
            Top Cryptocurrencies by Market Cap
        </StyledTitle>
    );
}

export default Title;