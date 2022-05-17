import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import { useAuth } from "../contexts/AuthContext";

const UserHandler = () => {
    const { currentUser } = useAuth();

    return (
        <>
            { currentUser !== null ? <Dashboard /> : <Login /> }
        </>
    );
};

export default UserHandler;