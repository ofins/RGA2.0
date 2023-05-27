import '../../../styles/navbar.css'
import { Link, NavLink} from 'react-router-dom'
import {
    Container,
    Navbar,
    Nav
} from 'react-bootstrap'

function NavbarComponent() {

    const activeStyles= {
        color:'#FCB726',

    }

    return(
        <div className="navbar--container">
                <Navbar bg="dark" variant="dark" collapseOnSelect expand="sm">
                    <Container>
                    <Navbar.Brand className="navbar--logo">
                        <img
                        alt=""
                        src="/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                        <NavLink 
                            to="/"
                            className="navbar--links"
                        >
                        RGA
                        </NavLink>
                    </Navbar.Brand>
                    <Nav className="me-5">
                        <Nav.Link className="navbar--links mx-4">
                            <NavLink 
                                to="roster"
                                style={({isActive}) => isActive ? activeStyles : null}
                                className="navbar--links"
                            >
                                Roster
                            </NavLink>
                        </Nav.Link>
                        <Nav.Link className="navbar--link mx-4">
                            <NavLink 
                                to="games"
                                style={({isActive}) => isActive ? activeStyles : null}
                                className="navbar--links"
                            >
                                Games
                            </NavLink>
                        </Nav.Link>
                        <Nav.Link className="navbar--link mx-4">  
                            <NavLink 
                                to="analysis"
                                style={({isActive}) => isActive ? activeStyles : null}
                                className="navbar--links"
                            >
                                Analysis
                            </NavLink>
                        </Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
        </div>
    )
}

export default NavbarComponent;