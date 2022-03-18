//import { StyledHeader } from './styles/Header.styles';
import styled from 'styled-components';
import logoSmall from './../assets/images/logo-small.png';
import logo from './../assets/images/logo.png';

const StyledHeader = styled.header`
    //background-color: ${({ theme }) => theme.colors.header};

    h1{
        color:red;
    }

    /* & represents the current element */
    &:hover {
        background-color: black;
    }
`;

const Header = ({ isMobile }) => {

    return ( 
        <StyledHeader>
            <img src={isMobile ? logoSmall : logo} alt='Logo'/>
        </StyledHeader>

    );
}

export default Header;