import logo from './backpack-blue-rucksack-travel-canvas.svg';
import profileIcon from './person-purple-hair-man.svg';
import style from './Header.module.css';

const Header = () => {
    return (
        <header>
            <div className={style.wrapper}>
                <a href="/"><img src={logo} alt="Mosquito Home"
                    className={style.logo} /></a>

                <ul className={style.navBar}>
                    <a href="/login">
                        <li>LOGIN</li>
                    </a>
                    <a href="/register">
                        <li>REGISTER</li>
                    </a>
                    <a href="/logout">
                        <li>LOGOUT</li>
                    </a>
                    <a href="/map">
                        <li>MAP</li>
                    </a>
                    <span>Welcome, Guest <a href="/profile"><img src={profileIcon} alt="Profile"
                        className={style.profile} /></a></span>
                </ul>
            </div>
        </header>
    );
};

export default Header;