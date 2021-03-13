import logo from './backpack-blue-rucksack-travel-canvas.svg';
import profileIcon from './person-purple-hair-man.svg';
import style from './Header.module.css';

const Header = () => {
    return (
        <header>
            <a href="/"><img src={logo} alt="Mosquito Home"
                className={style.logo} /></a>

            <ul className={style.navBar}>
                <a href="/login">
                    <li>Login</li>
                </a>
                <a href="/register">
                    <li>Register</li>
                </a>
                <a href="/logout">
                    <li>Logout</li>
                </a>
                <a href="/map">
                    <li>Map</li>
                </a>
                <span>Welcome, Guest <a href="/profile"><img src={profileIcon} alt="Profile"
                    className={style.profile} /></a></span>
            </ul>
        </header>
    );
};

export default Header;