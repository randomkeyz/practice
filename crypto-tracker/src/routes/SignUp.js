import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

const StyledMessage = styled.p`
    margin-bottom: 0.9em;
`;

const StyledInput = styled.input`
    width: 100%;
    height: 2.5em;
    border-radius: 0.5em;
    border: 1px solid ${props => props.theme.colors.lightGray};
    margin: 0.3em 0;
`;

const StyledSubmit = styled.input`

`;

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();

    function handleSubmit(e){
        e.preventDefault();
        signup(emailRef.current.value, passwordRef.current.value);
    }

    return (
        <>
            <StyledMessage>Sign up today to create your own crypto portfolio and watchlist.</StyledMessage>
            <StyledInput type='email' ref={emailRef} required />
            <StyledInput type='password' ref={passwordRef} />
            <StyledInput type='password' red={passwordConfirmRef} />
            <StyledSubmit type='submit' />
            <StyledMessage>Already a member? <Link to='/login'>Log in</Link></StyledMessage>
        </>
    );
};

export default SignUp;