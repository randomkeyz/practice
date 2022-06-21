import { useOutletContext } from 'react-router-dom';
import Table from '../components/Table';

const Home = () => {
    const [top10] = useOutletContext();

    return( <Table rows={top10} /> );
};

export default Home;