import React, { createContext, useContext, useState, useEffect } from "react";
import { 
    getAuth,
    sendPasswordResetEmail, 
    signOut, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged
} from 'firebase/auth';
import { firebaseApp } from '../firebase';


const auth = getAuth(firebaseApp); // Passing app param is optional, but can pass to be explicit
const AuthContext = createContext();

// Will allow use to access auth context from any component
export function useAuth() {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        let unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false); // Set to false after user is authenticated

            if(user !== null){
                console.log(user, 'logged in');
            } else {
                console.log('no user');
            }

        });
        return unsubscribe; // return will clean up the useEffect method
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    };

    return ( 
        // All components must be wrapped in auth provider to have access to context and data being passed down
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;