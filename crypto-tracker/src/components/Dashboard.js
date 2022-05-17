import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    if(currentUser) {
        return ( 
            <>
                <button onClick={() => {
                    logout(); 
                    navigate(`/`); 
                }}>Logout</button>
            </>
        );
    } else {
        return (
            <>
                <p>Uh oh! Looks like no ones logged in. Please log in below.</p>
                <Login />
            </>
        )
    }
}

export default Dashboard;