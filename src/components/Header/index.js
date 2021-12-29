import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-scroll'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Logo from "../../assets/images/logo.png";
import './styles.css';

const Header = React.memo(() => {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark">
            <Container className="justify-content-between pt-2 pb-2">
                <Navbar.Brand className="nav-logo-md" href="">
                    <img className="img-fluid" src={Logo} alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
                    <Navbar.Brand className="nav-logo-lg" href="">
                        <img className="img-fluid" src={Logo} alt="" />
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link><Link to="mint">Mint</Link></Nav.Link>
                        <Nav.Link><Link to="about">About</Link></Nav.Link>
                        <Nav.Link><Link to="story">Story</Link></Nav.Link>
                        <Nav.Link><Link to="roadmap">Roadmap</Link></Nav.Link>
                        <Nav.Link><Link to="team">Team</Link></Nav.Link>
                    </Nav>
                    <Nav className="socials mt-4 mt-lg-0">
                        <Nav.Link href="https://discord.gg/km87hWACy2" target="_blank">
                            <div className="social">
                                <FontAwesomeIcon icon={faDiscord} />
                            </div>
                        </Nav.Link>
                        <Nav.Link href="https://twitter.com/KingOfSerpentz" target="_blank">
                            <div className="social">
                                <FontAwesomeIcon icon={faTwitter} />
                            </div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default Header;
