import { Outlet, NavLink } from 'react-router-dom'
import '../../../styles/RosterLayout.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Form,
    Modal
} from 'react-bootstrap'
import * as actions from '../../redux/actions/index'
import axios from 'axios'
import CreateModal from '../modals/CreateModal';


function RosterLayout() {
    //for modal***
    const show = useSelector(state => state.showModal)
    const [toggle, setToggle] = useState(false)

    const dispatch = useDispatch();

    const handleShow = (num) => {
        dispatch(actions.showModal(num))
    };

    //fetch data for all teams
    const fetchAllTeams = async () => {
        try {
            const res = await axios.get("https://rga-backend-jdbm.onrender.com/teams")
            dispatch(actions.importTeams(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    //team data are stored in teamReducer state
    const teams = useSelector(state => state.teamReducer)
    console.log(teams)
    
    const activeStyles = {
        color: 'white',
        backgroundColor: 'black',
    }
    
    //when team on rosterList is selected, it will be saved into a state
    const selectedTeam = useSelector(state => state.selectedTeamReducer)
    
    //deleting team from database
    const handleDelete = async(id) => {
        try {
            const res = await axios.delete("https://rga-backend-jdbm.onrender.com/teams/delete/"+id)
            setToggle(prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllTeams();
    }, [show , selectedTeam, toggle])
    return (
        <div className='rosterLayout--container'>
            <div className="rosterLayout--nav">
                <div className="rosterLayout--navBtns">
                    <Button
                        id="newTeamBtn"
                        onClick={() => handleShow(0)}
                    >New</Button>
                    {selectedTeam
                        ? <>
                            <Button
                                id="editTeamBtn"
                                onClick={() => handleShow(2)}
                            >Edit</Button>
                        </>
                        : null
                    }
                </div>
                <div className="rosterLayout--itemContainer">
                    {teams.length ? teams.map(team => (
            <NavLink className="rosterLayout--item"
                to={`${team._id}`}
                key={team._id}
                style={({ isActive }) => isActive ? activeStyles : null}
                onClick={() => dispatch(actions.selectRosterTeam(team._id))}
            >
                {selectedTeam === team._id ? <Button onClick={() => handleDelete(team._id)} size='sm' variant='light'>Del</Button> : <span />}
                {team.teamName}
            </NavLink>
        )) : null}
                </div>
                <CreateModal number={0} />{/* new_team */}
                <CreateModal number={2} />{/* edit_team */}
            </div>
            <Outlet />
        </div >
    )
}

export default RosterLayout;