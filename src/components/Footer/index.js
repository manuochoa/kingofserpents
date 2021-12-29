import React from "react";
import './styles.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faTwitter} from "@fortawesome/free-brands-svg-icons";

const Footer = React.memo(() => {
    return (
        <footer>
            <div className="container d-flex flex-column justify-content-center align-items-center text-center pt-5 pb-5">
                <div className="d-flex">
                    <a href="https://discord.gg/km87hWACy2" target="_blank" className="me-3" rel="noreferrer">
                        <div className="social">
                            <FontAwesomeIcon icon={faDiscord} />
                        </div>
                    </a>
                    <a href="https://twitter.com/KingOfSerpentz" target="_blank" rel="noreferrer">
                        <div className="social">
                            <FontAwesomeIcon icon={faTwitter} />
                        </div>
                    </a>
                </div>
                <h1 className="mt-3 mb-3">King Of <br/> Serpentz</h1>
                <h6>© 2021 Serpentz All Right Reserved</h6>
            </div>
        </footer>
    );
});

export default Footer;
