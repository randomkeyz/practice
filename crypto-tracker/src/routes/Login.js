import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const StyledSubmit = styled.button`
    margin: 0.75em 0 3em 0;
`;

const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            navigate(`/dashboard`);
        } catch (error){
            console.log(error);
            setLoading(false);
            setError('Error: ' + error.code);
        }
        
        
    };

    return (
        <>
            {error && <p>{ error }</p>}
            <form onSubmit={handleSubmit}>
                <input type='email' ref={emailRef} placeholder='Email' required />
                <input type='password' ref={passwordRef}  placeholder='Password' />
                <StyledSubmit disabled={loading} type='submit'>Submit</StyledSubmit>
                <p>Not a member? <Link to='/signup'>Sign up today!</Link></p>
            </form>
        </>
    );
};

export default Login;