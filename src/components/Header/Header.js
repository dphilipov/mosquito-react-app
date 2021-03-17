import logo from './backpack-blue-rucksack-travel-canvas.svg';
import profileIcon from './person-purple-hair-man.svg';
import style from './Header.module.css';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header>
            <div className={style.wrapper}>
                <Link to="/"><img src={logo} alt="Mosquito Home"
                    className={style.logo} /></Link>

                <ul className={style.navBar}>
                    <Link to="/login">
                        <li>LOGIN</li>
                    </Link>
                    <Link to="/register">
                        <li>REGISTER</li>
                    </Link>
                    <Link to="/logout">
                        <li>LOGOUT</li>
                    </Link>
                    <Link to="/map">
                        <li>MAP</li>
                    </Link>
                    <span>Welcome, Guest <Link to="/profile"><img src={profileIcon} alt="Profile"
                        className={style.profile} /></Link></span>
                </ul>
            </div>
        </header>
    );
};

export default Header;