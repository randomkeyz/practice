import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from '../contexts/AuthContext';

const StyledInput = styled.input`
    width: 100%;
    height: 2.5em;
    border-radius: 0.5em;
    border: 1px solid ${props => props.theme.colors.lightGray};
    margin: 0.3em 0;
`;

const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
        } catch (error){
            console.log(error);
            setError('Failed to login');
        }
        setLoading(false);
        navigate(`/dashboard`);
    };

    return (
        <>
            {error && <p>{ error }</p>}
            <form onSubmit={handleSubmit}>
                <StyledInput type='email' ref={emailRef} placeholder='Email' required />
                <StyledInput type='password' ref={passwordRef}  placeholder='Password' />
                <button disabled={loading} type='submit'>Submit</button>
                <p>Not a member? <Link to='/signup'>Sign up today!</Link></p>
            </form>
        </>
    );
};

export default Login;