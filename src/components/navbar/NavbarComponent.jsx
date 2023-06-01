import '../../../styles/navbar.css'
import { Link, NavLink } from 'react-router-dom'
import {
    Container,
    Navbar,
    Nav
} from 'react-bootstrap'
import { useSelector } from 'react-redux'

function NavbarComponent() {

    const recordGame = useSelector(state => state.recordGame)

    const activeStyles = {
        color: '#FCB726',

    }

    const activeLiveGameStyle = {
        padding:'5px',
        borderRadius:'10px',
        backgroundColor:'red',
        color:'white',
    }

    const liveGameStyle = {
        padding:'5px',
        borderRadius:'10px',
        backgroundColor:'red',
        color:'black',
    }


    return (
        <div className="navbar--container">
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="sm">
                <Container>
                    <Navbar.Brand className="navbar--logo">
                        <img
                            alt=""
                            src="/bball.svg"
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
                                style={({ isActive }) => isActive ? activeStyles : null}
                                className="navbar--links"
                            >
                                Roster
                            </NavLink>
                        </Nav.Link>
                        {/* disabled */}
                        <Nav.Link className="navbar--link mx-4" disabled>
                            <NavLink
                                to="games"
                                style={({ isActive }) => isActive ? activeStyles : null}
                                className="navbar--links disabled"
                                
                            >
                                Games
                            </NavLink>
                        </Nav.Link>
                        {/* disabled */}
                        <Nav.Link className="navbar--link mx-4" disabled>
                            <NavLink
                                to="analysis"
                                style={({ isActive }) => isActive ? activeStyles : null}
                                className="navbar--links"
                            >
                                Analysis
                            </NavLink>
                        </Nav.Link>
                        {recordGame.game_id !== '' ?
                            <Nav.Link className="navbar--link mx-4">
                                <NavLink
                                    to="record-game"
                                    style={({ isActive }) => isActive ? activeLiveGameStyle : liveGameStyle}
                                    className="navbar--links"
                                >
                                    On-Going Game
                                </NavLink>
                            </Nav.Link>
                            :
                            null
                        }
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent;