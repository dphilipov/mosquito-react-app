// React, Hooks
import { useContext, useEffect } from 'react';

import logo from './mosquito-logo.png';
import style from './Header.module.css';
import { Link, Redirect } from 'react-router-dom';
import { UserConsumer } from '../userContext';
import authServices from '../../services/authServices';
import firebase from '../../config/firebase';

// Context
import AuthContext from '../../context/authContext';


const Header = ({ action }) => {
    const user = useContext(AuthContext)

    useEffect(() => {
        user.checkIfLogged();
    }, [])

    function onLogout() {
        firebase
            .auth()
            .signOut()
            .then((response) => {
                authServices.clearUserData();
                action();
                <Redirect to="/login" />
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

                <div className={style.navContainer}>
                    <ul className={style.navBar}>

                        {!user.isLogged ?
                            <>
                                <Link to="/login">
                                    <li>LOGIN</li>
                                </Link>

                                <Link to="/register">
                                    <li>REGISTER</li>
                                </Link>

                            </>
                            :
                            <>
                                <Link to="/map">
                                    <li>MY MAP</li>
                                </Link>

                                <Link to={`/profile/${user.info.email}`}>
                                    <li>PROFILE</li>
                                </Link>

                                <Link to="/login" onClick={() => onLogout()}>
                                    <li>LOGOUT</li>
                                </Link>
                            </>
                        }
                    </ul>

                    <span className={style.welcomeMessage}>
                        Welcome,
                        {user.isLogged ?
                            <Link to={`/profile/${user.info.email}`}>
                                <strong> {user.info.email}</strong>
                            </Link>
                            :
                            <span> Guest</span>
                        }
                        !
                    </span>
                </div>
            </div>

        </header>
    )
}

export default Header;