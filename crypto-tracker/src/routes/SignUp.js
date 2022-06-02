import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

//import Firebase context

const StyledMessage = styled.p`
    margin-bottom: 0.9em;
`;

const StyledSubmit = styled.button`
    margin: 0.75em 0 3em 0;
`;

const SignUp = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch (error){
            console.log(error);
            setError('Failed to create an account');
        }
        setLoading(false);
    };

    return (
        <>
            <StyledMessage>Sign up today to create your own crypto portfolio and watchlist.</StyledMessage>
            {error && <p>{ error }</p>}
            <form onSubmit={handleSubmit}>
                <input type='email' ref={emailRef} placeholder='Email' required />
                <input type='password' ref={passwordRef}  placeholder='Password' />
                <input type='password' ref={passwordConfirmRef} placeholder='Password Confirm' />
                <StyledSubmit disabled={loading} type='submit'>Submit</StyledSubmit>
            </form>
            <p>Already a member? <Link to='/login'>Log in here</Link></p>
        </>
    );
};

export default SignUp;