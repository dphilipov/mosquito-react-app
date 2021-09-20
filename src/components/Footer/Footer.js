import './Footer.module.css'
import gitHubIcon from "./github-icon.png";

const Footer = () => {
    return (
        <footer>
            Created by Dimitar Filipov
            <a
                href="https://github.com/dphilipov"
                target="_blank"
                rel="noreferrer">
                <img
                    src={gitHubIcon}
                    alt="Github Icon"
                />
            </a>
        </footer>
    )
}

export default Footer;