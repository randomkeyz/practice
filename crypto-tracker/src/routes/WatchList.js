//import Table from '../components/Table';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const WatchList = () => {
    const nomicsKey = useOutletContext();
    const {currentUser} = useAuth();
    const watchlist = {};
    //<Table rows={watchlist} />

    
    return ( 
        <>
            <h1></h1>
            <div></div>
        </>
    );
}

export default WatchList;