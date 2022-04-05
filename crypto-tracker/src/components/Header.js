//import { StyledHeader } from './styles/Header.styles';
import styled from 'styled-components';
import logoSmall from './../assets/images/logo-small.png';
import logo from './../assets/images/logo.png';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
    //background-color: ${({ theme }) => theme.colors.header};


`;

const Header = ({ isMobile }) => {

    return ( 
        <StyledHeader>
            <Link to='/'><img src={isMobile ? logoSmall : logo} alt='Logo'/></Link>
        </StyledHeader>

    );
}

export default Header;