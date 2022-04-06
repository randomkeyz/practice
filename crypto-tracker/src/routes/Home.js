import Table from '../components/Table';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
    // Allows us to pass data from parent route (App.js)
    const [top10] = useOutletContext();

    return(
        <>
            <Table rows={top10} />
        </>
    );
};

export default Home;