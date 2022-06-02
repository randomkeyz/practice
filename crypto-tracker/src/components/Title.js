import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const StyledTitle = styled.h1`
    font-size: 1.5em;
    text-align: center;
    margin: 1em 0;
`;

const Title = () => {
    let location = useLocation();

    const renderGreeting = () => {
        let hour = new Date().getHours();
        
        if(hour < 12) return 'Good Morning';
        if(hour >= 12 && hour < 18) return 'Good Afternoon';
        if(hour > 18) return 'Good Evening';
        
    };

    const renderTitle = (location) => {
        switch(location.pathname){
            case '/':
                return 'Top Cryptocurrencies by Market Cap';
            case '/signup':
                return 'Create new account';
            case '/login':
                return 'Login';
            case '/dashboard':
                return 'Dashboard';
            case '/assets':
                return 'My Assets';
            case '/watchlist':
                return 'My Watchlist';
            default:
                return renderGreeting();
        }
    };

    return ( 
        <StyledTitle>
            { renderTitle(location) }
        </StyledTitle>
    );
}

export default Title;