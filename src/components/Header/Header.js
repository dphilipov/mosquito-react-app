import logo from './mosquito-logo.png';
import style from './Header.module.css';
import { Link, Redirect } from 'react-router-dom';
import { UserConsumer } from '../userContext';
import authServices from '../../services/authServices';
import firebase from '../../config/firebase';


const Header = (props) => {

    function onLogout() {
        firebase.auth().signOut()
            .then((response) => {
                authServices.clearUserData();
                props.action();
                <Redirect to="/login" />
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <UserConsumer>
            {
                (userCheck) => {
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

                                        {!userCheck.isLogged ?
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

                                                <Link to={`/profile/${userCheck.email}`}>
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
                                        <Link to={`/profile/${userCheck.email}`}>
                                            <strong>{userCheck.email}</strong>
                                        </Link>
                                        !
                                    </span>
                                </div>
                            </div>

                        </header>
                    )
                }
            }

        </UserConsumer>
    );
};

export default Header;