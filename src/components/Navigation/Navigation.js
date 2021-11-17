// React, Hooks
import { Link } from 'react-router-dom';

// CSS
import style from './Navigation.module.css';

function Navigation({ user, onLogout }) {

    return (
        <div className={style.navContainer}>
            <nav className={style.navBar}>
                {user.isLogged &&
                    <>
                        <Link to="/map">
                            <li>MY MAP</li>
                        </Link>

                        <Link to={`/profile/${user.info.email}`}>
                            <li>PROFILE</li>
                        </Link>

                        <Link to='/login'>
                            <li onClick={onLogout}>LOGOUT</li>
                        </Link>
                    </>
                }

                {!user.isLogged &&
                    <>
                        <Link to="/login">
                            <li>LOGIN</li>
                        </Link>

                        <Link to="/register">
                            <li>REGISTER</li>
                        </Link>

                    </>
                }
            </nav>
            
            <span className={style.demoCredentials}>Demo credentials: test@test.bg</span>

            <span className={style.welcomeMessage}>
                Welcome,
                {user.isLogged
                    ? <Link to={`/profile/${user.info.email}`}>
                        <strong> {user.info.email}</strong>
                    </Link>
                    : <span> Guest</span>
                }
                !
            </span>

        </div>
    )
}

export default Navigation
