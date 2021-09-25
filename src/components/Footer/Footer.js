import style from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


const Footer = () => {
    return (
        <footer>
            <span>Created by Dimitar Filipov</span>
            <Link to={{ pathname: "https://github.com/dphilipov" }} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} className={style.icon} />
            </Link>
        </footer>
    )
}

export default Footer;