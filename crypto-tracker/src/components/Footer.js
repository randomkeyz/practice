import styled from 'styled-components';
import coin from './../assets/images/coin.png';
import edit from './../assets/images/edit.png';
import home from './../assets/images/home.png';
import star from './../assets/images/star.png';

const StyledFooter = styled.footer`
    a{
        text-align: center;
        margin: 0 1em;
        font-size: 0.75em;
        display: block;
    }

    div{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        background: #D4D4D4;
        padding: 0.5em 1em;
        position: fixed;
        bottom: 0;
    }
`;

const Footer = () => {
    return ( 
        <StyledFooter>
            <a href="https://nomics.com" target="_blank">Crypto Market Cap &amp; Pricing Data Provided By Nomics</a>
            <div>
                <span><img src={home} alt='Home'/></span>
                <span><img src={coin} alt='Portfolio'/></span>
                <span><img src={star} alt='Favorites'/></span>
                <span><img src={edit} alt='Edit'/></span>
            </div>
        </StyledFooter>
     );
}
 
export default Footer;