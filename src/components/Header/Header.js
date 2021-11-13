// React, Hooks
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Context
import AuthContext from '../../context/authContext';

// Components
import Navigation from '../Navigation/Navigation';

// Services
import authServices from '../../services/authServices';

// CSS
import style from './Header.module.css';

// Other
import firebase from '../../config/firebase';
import logo from './mosquito-logo.png';

const Header = () => {
    const user = useContext(AuthContext)

    useEffect(() => {
        user.checkIfLogged();
    }, [])

    const onLogoutHandler = () => {
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
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Mosquito Home"
                            className={style.logo}
                        />
                    </Link>
                    <span className={style.logoText}>MOSQUITO</span>
                </div>

                <Navigation user={user} onLogout={onLogoutHandler} />
            </div>
        </header>
    )
}

export default Header;