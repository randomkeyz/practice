import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';

const StyledSearchResults = styled.div`
    border: 1px solid ${props => props.theme.colors.lightGray};
    margin-top: -0.4em;
    padding: 0.6em 0;
    background: #fff;
`;

const StyledList = styled.ul`
    margin: 0;
    list-style-type: none;
    padding: 0 0.7em;
`;

const StyledResult = styled.li`
    padding: 0.5em 0;
`;

const Search = ({currencyList}) => {
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [results, setResults] = useState(null);
    
    let location = useLocation().pathname;

    // Determine whether to render search bar
    useEffect(() => {
        if(location == '/login' || location == '/signup' || location == '/dashboard') return setShowSearchBar(false);
        return setShowSearchBar(true);
    }, [location]);


    // SEARCH
    const search = (e) => {
        // Set results state to null if input empty
        if(e.target.value == '') return setResults(null);

        // Search names and symbols for matches
        const regex = new RegExp('^' + e.target.value, 'gi');
        const results = currencyList.filter(currency => {
            if(regex.test(currency.symbol) || regex.test(currency.name)) return true;
        });

        // Set results state to null if no results found else update state with populated list
        if(results.length == 0) return setResults(null);
        setResults(results);


        console.log(regex);
        console.log(results);
    };


    if(!showSearchBar) return <></>;

    return ( 
        <>
            <input placeholder='Search currencies' onKeyUp={search}/>
            {(results) &&
                <StyledSearchResults>
                    <StyledList>
                        {
                            results.map((result, index) => (
                                <StyledResult key={index}>
                                    <Link to={`currencies/${result.symbol.toLowerCase()}/`}>{result.name} ({result.symbol})</Link>
                                </StyledResult>
                            ))
                        }
                    </StyledList>
                </StyledSearchResults>
            }
        </>
    );
}

export default Search;