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

                                <Link to="/"><img src={logo} alt="Mosquito Home"
                                    className={style.logo} />
                                </Link>

                                {!userCheck.isLogged
                                    ?
                                    <ul className={style.navBar}>
                                        <Link to="/login">
                                            <li>LOGIN</li>
                                        </Link>

                                        <Link to="/register">
                                            <li>REGISTER</li>
                                        </Link>

                                        <span className={style.welcomeMessage}>Welcome, {userCheck.email}!

                                        </span>
                                    </ul>


                                    :
                                    <ul className={style.navBar}>
                                        <Link to="/login" onClick={() => onLogout()}>
                                            <li>LOGOUT</li>
                                        </Link>

                                        <Link to={`/profile/${userCheck.email}`}>
                                            <li>PROFILE</li>
                                        </Link>

                                        <Link to="/map">
                                            <li>MY MAP</li>
                                        </Link>

                                        <span className={style.welcomeMessage}>
                                            Welcome, 
                                            <Link to={`/profile/${userCheck.email}`}>
                                                <strong> {userCheck.email}</strong>
                                            </Link>
                                            !
                                        </span>
                                    </ul>



                                }
                            <span className={style.logoText}>MOSQUITO</span>

                            </div>

                        </header>
                    )
                }
            }

        </UserConsumer>
    );
};

export default Header;