import { useState, useEffect, useCallback } from 'react'; // Using hooks to determine size for responsiveness
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './components/styles/Global';
import theme from './components/styles/Theme';
import Header from './components/Header';
import Title from './components/Title';
import Search from './components/Search';
import { Container } from './components/styles/Container.styles';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';

function App() {
  // Hooks must be run in exact same order
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [top10, setTop10] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(true);

  let location = useLocation().pathname;
  const key = process.env.REACT_APP_NOMICS_API_KEY; // Nomics Key
  const isMobile = windowSize < 1023;
  const updateWidth = () => setWindowSize(window.innerWidth); // Update window width state

  // Determine whether to render search bar
  useEffect(() => {
    if(location == '/login' || location == '/signup' || location == '/dashboard') return setShowSearchBar(false);
    return setShowSearchBar(true);
  }, [location]);

  // 2nd param is array of things to watch. If those change, function is rerun. If left as empty array it only runs on mount.
  // Handle screen resize
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Handle top 10
  const fetchTop10 = useCallback(async () => {
    try{
      const res = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${key}&interval=1d,30d&per-page=10&page=1`);
      const data = await res.json();
      setTop10(data);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchTop10();

    // Fetch top 5 every sec and then clear interval
    const interval = setInterval(() => {
      fetchTop10();
    }, 5000);
    return () => clearInterval(interval);

  }, [fetchTop10]);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <Container>
          <Header isMobile={isMobile} />
          <Title />
          { showSearchBar && <Search />}
          
          {/* Will nest components for shared layout based on url */}
          <Outlet context={[top10]} />
        </Container>
        <Footer isMobile={isMobile} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;