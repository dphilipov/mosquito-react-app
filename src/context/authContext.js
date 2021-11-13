import React, { useState } from 'react';
import authServices from '../services/authServices';

const AuthContext = React.createContext({
    isLogged: false,
    info: {},
    checkIfLogged: () => { },
});

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [info, setInfo] = useState({});

    const checkIfLoggedHandler = () => {
        const user = authServices.getUserData();

        if (user) {
            setIsLogged(true)
            setInfo(user);
        } else {
            setIsLogged(false);
            setInfo({});
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                info,
                checkIfLogged: checkIfLoggedHandler,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};