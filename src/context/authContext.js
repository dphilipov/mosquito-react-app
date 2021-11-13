import React, { useEffect, useState } from 'react';
import authServices from '../services/authServices';

const AuthContext = React.createContext();

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    let user = authServices.getUserData()

    useEffect(() => {
        if (user) {
            setIsLogged(true)
        } else {
            setIsLogged(false);
        }
    }, [user])

    return (
        <AuthContext.Provider
            value={isLogged}
        >
            {children}
        </AuthContext.Provider>
    );
};