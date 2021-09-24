import './Footer.module.css';
import { Link } from 'react-router-dom';
import gitHubIcon from "./github-icon.png";

const Footer = () => {
    return (
        <footer>
            <span>Created by Dimitar Filipov</span>
            <Link to={{ pathname: "https://github.com/dphilipov" }} target="_blank" rel="noreferrer">
                <img
                    src={gitHubIcon}
                    alt="Github Icon"
                />
            </Link>
        </footer>
    )
}

export default Footer;