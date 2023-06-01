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
    const currentlyPlaying = useSelector(state => state.currentlyPlaying)
    const recordStats = useSelector(state => state.recordGame)

    //find entire team data for home and away team by matching the team names passed in here
    const homeTeam = useSelector((state) => state.teamReducer).filter(
        (team) => team.name === recordStats.home.team
    );
    const awayTeam = useSelector((state) => state.teamReducer).filter(
        (team) => team.name === recordStats.away.team
    );
    console.log('home team is')
    console.log(recordStats)

    //list them into arrays
    if (homeTeam.length !== 0 && awayTeam.length !== 0) {
        var homeTeamList = homeTeam[0].players.map(obj => obj.name)
        var awayTeamList = awayTeam[0].players.map(obj => obj.name)
    }

    console.log(awayTeamList)

    //when option is selected, update the currentlyPlaying state on Redux
    const handleOptionSelect = (e, position) => {
        if (homeTeam.length !== 0) {
            let number;
            let team;
            //if home team, use this
            if (position <= 5) {
                number = homeTeam[0].players.find(player => player.name === e.target.value).number
                team = recordStats.home.team
                // if away team, use this
            } else {
                number = awayTeam[0].players.find(player => player.name === e.target.value).number
                team = recordStats.away.team

            }
            dispatch(actions.inputCurrentlyPlaying(e.target.value, position, number, team))
        }
    }

    const currentPlayers = currentlyPlaying.map(b => b.player)

    //create a list of players based on selected team and input it into table

    const optionStyle = {
        width: '200px'
    }

    const homePosition = [1, 2, 3, 4, 5]
    const displayHomeList = homePosition.map((position, index) => (
        <tr key={index} className="text-center">
            <td>
                <select
                    style={optionStyle} className='text-center'
                    onChange={(e) => handleOptionSelect(e, position)}
                    value={currentlyPlaying[position - 1].player}
                >

                    <option >
                        {currentlyPlaying[position - 1].player !== '' ?
                            currentlyPlaying[position - 1].player :
                            'Select a player'
                        }
                    </option>
                    {/* homeList will filter out names that are included in currentPlayer */}
                    {homeTeamList ? homeTeamList
                        .filter(name => !currentPlayers.includes(name))
                        .map((player, index) =>
                        (
                            <option key={index}>{player}</option>
                        )) : null}
                </select>
            </td>
        </tr>
    )
    )
    const awayPosition = [6, 7, 8, 9, 10]
    const displayAwayList = awayPosition.map((position, index) => (
        <tr key={index} className="text-center">
            <td>
                <select
                    style={optionStyle} className='text-center'
                    onChange={(e) => handleOptionSelect(e, position)}
                    value={currentlyPlaying[position - 1].player}
                >
                    <option>
                        {currentlyPlaying[position - 1].player !== '' ?
                            currentlyPlaying[position - 1].player :
                            'Select a player'
                        }
                    </option>
                    {awayTeamList ? awayTeamList
                        .filter(name => !currentPlayers.includes(name))
                        .map((player, index) =>
                        (
                            <option key={index}>{player}</option>
                        )) : null}
                </select>
            </td>
        </tr>
    )
    )

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Edit Floor Players </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr className="text-center">
                            <th>Home Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayHomeList}
                    </tbody>
                </Table>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr className="text-center">
                            <th>Away Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayAwayList}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="primary">
                    Add Player
                </Button> */}
                <Button variant="secondary" onClick={() => handleClose(3)}>
                    Close
                </Button>
            </Modal.Footer>
        </>
    )
}

export default Modal_3;