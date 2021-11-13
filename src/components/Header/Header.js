// React, Hooks
import { useContext, useEffect } from 'react';

import logo from './mosquito-logo.png';
import style from './Header.module.css';
import { Link } from 'react-router-dom';
import authServices from '../../services/authServices';
import firebase from '../../config/firebase';
import Navigation from '../Navigation/Navigation';

// Context
import AuthContext from '../../context/authContext';


const Header = () => {
    const user = useContext(AuthContext)

    useEffect(() => {
        user.checkIfLogged();
    }, [])

    const onLogout = () => {
        firebase
            .auth()
            .signOut()
            .then((response) => {
                authServices.clearUserData();
            })
            .then(res => {
                user.checkIfLogged();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <header>
            <div className={style.wrapper}>
                <div className={style.logoContainer}>
                    <Link to="/"><img src={logo} alt="Mosquito Home"
                        className={style.logo} />
                    </Link>
                    <span className={style.logoText}>MOSQUITO</span>
                </div>

                <Navigation user={user} onLogout={onLogout} />
            </div>
        </header>
    )
}

export default Header;