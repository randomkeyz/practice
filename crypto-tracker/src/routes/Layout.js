import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../components/styles/Global';
import theme from '../components/styles/Theme';
import Header from '../components/Header';
import Title from '../components/Title';
import Search from '../components/Search';
import { Container } from '../components/styles/Container.styles';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [currencyList, setCurrencyList] = useState();
    const [top10, setTop10] = useState([]);
    const [allData, setAllData] = useState([]);

    const nomicsKey = process.env.REACT_APP_NOMICS_API_KEY; // Nomics Key
    const isMobile = windowSize < 1023;
    const updateWidth = () => setWindowSize(window.innerWidth); // Update window width state

    // FETCH INIT DATA
    const fetchDataInit = async () => {
        try{
            const res = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${nomicsKey}`);
            const data = await res.json();

            // TOP 10 INIT
            const top10Init = data.filter((currency, index) => {
                if(index <= 9) return currency;
                return;
            });
            setTop10(top10Init);

            // COIN SEARCH LIST INIT
            const currencies = data.map((currency) => {
                return { 
                    symbol: currency.symbol,
                    name: currency.name
                };
            });
            setCurrencyList(currencies);

            console.log('crypto init');
        } catch (err) {
            console.log(err);
        }
    };

    // FETCH DATA
    const fetchFullData = useCallback(async () => {
        try{
            const res = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${nomicsKey}`);
            const data = await res.json();
            setAllData(data);

            // SET TOP 10
            const top10Pull = data.filter((currency, index) => {
                if(index <= 9) return currency;
                return;
            });
            setTop10(top10Pull);

            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        fetchDataInit();

        // Fetch top 5 every sec and then clear interval
        const interval = setInterval(() => {
            fetchFullData();
        }, 5000);
        return () => clearInterval(interval);

    }, [fetchFullData]);

    // 2nd param is array of things to watch. If those change, function is rerun. If left as empty array it only runs on mount.
    // Handle screen resize
    useEffect(() => {
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return ( 
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Container>
                <Header isMobile={isMobile} />
                <Title />
                <Search currencyList={currencyList} />
                {/* Will nest components for shared layout based on url */}
                <Outlet context={[top10, allData]} />
            </Container>
            <Footer isMobile={isMobile} />
        </ThemeProvider>
    );
}

export default Layout;