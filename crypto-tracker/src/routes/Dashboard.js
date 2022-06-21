import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    
    return ( 
        <>
            <button onClick={() => {
                logout(); 
                navigate(`/`); 
            }}>Logout</button>
        </>
    );
}

export default Dashboard;