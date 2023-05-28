import {
    Modal,
    Button,
    Form,
    Table
} from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/index'

function Modal_3({ handleClose }) {
    const dispatch = useDispatch();

    // DISPLAYING PLAYER LIST **
    //get both team's info from Redux state
    const recordStats = useSelector(state => state.recordGame)

    //find entire team data for home and away team by matching the team names passed in here
    const homeTeam = useSelector((state) => state.teamReducer).filter(
        (team) => team.name === recordStats.home.team
    );
    const awayTeam = useSelector((state) => state.teamReducer).filter(
        (team) => team.name === recordStats.away.team
    );

    console.log(awayTeam)

    //list them into arrays
    if(homeTeam.length !== 0 && awayTeam.length !== 0) {
        var homeTeamList = homeTeam[0].players.map(obj => obj.name)
        var awayTeamList = awayTeam[0].players.map(obj => obj.name)
    }
    console.log(homeTeamList)

    //create a list of players based on selected team and input it into table
    const homeList = homeTeamList.map((player, index) => (
        <tr key={index} className="text-center">
            <td>
                <select>
                    <option>
                        {player}
                    </option>
                </select>
            </td>
        </tr>
    ))

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Edit Team: </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr className="text-center">
                            <th>Home Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {homeList}
                    </tbody>
                </Table>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr className="text-center">
                            <th>Away Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {homeList}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">
                    Add Player
                </Button>
                <Button variant="secondary" onClick={() => handleClose(3)}>
                    Close
                </Button>
            </Modal.Footer>
        </>
    )
}

export default Modal_3;