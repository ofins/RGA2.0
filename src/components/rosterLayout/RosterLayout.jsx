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
import CreateModal from '../modals/CreateModal';


function RosterLayout() {
    const dispatch = useDispatch();

    //for modal***
    const show = useSelector(state => state.showModal)

    const handleShow = (num) => {
        dispatch(actions.showModal(num))
        console.log(num)
    };

    //team data are stored in teamReducer state
    const teams = useSelector(state => state.teamReducer)


    const activeStyles = {
        color: 'white',
        backgroundColor: 'black',
    }

    //when team on rosterList is selected, it will be saved into a state
    const selectedTeam = useSelector(state => state.selectedTeamReducer)

    console.log('current team selected is ' + selectedTeam);


    //takes all team data and map it to create a list with team name with Links
    const teamEls = teams.map(team => (
        <NavLink className="rosterLayout--item"
            to={`${team.id}`}
            key={team.id}
            style={({ isActive }) => isActive ? activeStyles : null}
            onClick={() => dispatch(actions.selectRosterTeam(team.name))}
        >
            {team.name}
        </NavLink>
    ))

    return (
        <div className='rosterLayout--container'>
            <div className="rosterLayout--nav">
                <div className="rosterLayout--navBtns">
                    <button
                        id="newTeamBtn"
                        onClick={() => handleShow(0)}
                    >New</button>
                    {selectedTeam
                        ? <>
                            <button
                                id="editTeamBtn"
                                onClick={() => handleShow(2)}
                            >Edit</button>
                            <Button onClick={() => handleShow(1)}>Add Player</Button>
                        </>

                        : null
                    }
                </div>
                <div className="rosterLayout--itemContainer">
                    {teamEls}
                </div>
                <CreateModal number={0} />{/* new_team */}
                <CreateModal number={1} />{/* add_player */}
                <CreateModal number={2} />{/* edit_team */}
            </div>
            <Outlet />
        </div >
    )
}

export default RosterLayout;