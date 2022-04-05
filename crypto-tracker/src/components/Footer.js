import styled from 'styled-components';
import coin from './../assets/images/coin.png';
//import edit from './../assets/images/edit.png';
import home from './../assets/images/home.png';
import star from './../assets/images/star.png';
import account from './../assets/images/account.png';
import { Link } from 'react-router-dom';

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
                <span><Link to='/'><img src={home} alt='Home'/></Link></span>
                <span><Link to='/assets'><img src={coin} alt='Assets'/></Link></span>
                <span><Link to='/favs'><img src={star} alt='Favorites'/></Link></span>
                <span>
                    <Link to='/signup'><img src={account} alt='Sign Up'/></Link>
                </span>
            </div>
        </StyledFooter>
     );
}
 
export default Footer;