import {
    Modal,
    Button,
    Form,
    Table
} from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPenToSquare, } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/index'

function Modal_2({ handleClose }) {
    const dispatch = useDispatch();

    // DISPLAYING PLAYER LIST **
    //get players info from Redux state
    const teams = useSelector(state => state.teamReducer);

    //check which team is currently selected
    const selectedTeam = useSelector(state => state.selectedTeamReducer);

    //EDITING PLAYER INFO**
    //create state to hold updated info for editing player name/number
    const [updatePlayer, setUpdatePlayer] = useState({
        status: false,
        playerName: '',
        teamName: selectedTeam,
        newPlayerName: '',
        newPlayerNumber: ''
    });

    //update button 
    const handleUpdate = () => {
        dispatch(actions.editPlayerName(selectedTeam, updatePlayer.playerName, updatePlayer.newPlayerName, updatePlayer.newPlayerNumber))
        setUpdatePlayer({
            status: false,
            playerName: '',
            playerNumber: '',
            teamName: selectedTeam,
            newPlayerNumber: '',
            newPlayerName: ''
        })
    }

    //filter the players from selectedTeam
    const players = teams.find(item => {
        return item.name === selectedTeam
    }).players

    //create a list of players based on selected team and input it into table
    const playerList = players.map((player, index) => (
        <tr key={index} className="text-center">
            <td>
                {updatePlayer.playerName === player.name ?
                    <input type="text" onChange={e => setUpdatePlayer({
                        ...updatePlayer,
                        newPlayerNumber: e.target.value
                    })} placeholder={updatePlayer.playerNumber} style={{ width: '30px' }} />
                    :
                    player.number
                }
            </td>
            <td>
                {updatePlayer.playerName === player.name ?
                    <input type="text" onChange={e => setUpdatePlayer({
                        ...updatePlayer,
                        newPlayerName: e.target.value
                    })} placeholder={updatePlayer.playerName} style={{ width: '120px' }} />
                    :
                    player.name
                }
            </td>
            <td>
                {updatePlayer.playerName === player.name ? <Button variant="light" onClick={handleUpdate}>Update</Button> : <Button onClick={() => handleEdit(player.name, player.number)} variant="light">Edit</Button>}
            </td>
            <td><Button onClick={() => dispatch(actions.deletePlayerName(selectedTeam, player.name))} variant="light">Delete</Button></td>
        </tr>
    ))


    //when edit button is clicked, edit input box will appear and store which names to be edited in updatePlayer state
    const handleEdit = (name, number) => {
        setUpdatePlayer({
            ...updatePlayer,
            status: true,
            playerName: name,
            playerNumber: number
        })
    }

    //ADD NEW PLAYER **

    //temporary create new player name saved here
    const [newPlayer, setNewPlayer] = useState({
        status: false,
        teamName: selectedTeam,
        playerNumber: null,
        playerName: ''
    });

    const handleAddPlayer = () => {
        dispatch(actions.addPlayer(newPlayer))
        setNewPlayer({
            status: false,
            teamName: selectedTeam,
            playerNumber: null,
            playerName: ''
        })
    }



    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Edit Team: {selectedTeam}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>Player Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerList}
                    </tbody>
                </Table>
                {newPlayer.status ?
                    <>
                        <input className="mx-1" type="text" autoFocus onChange={e => setNewPlayer({
                            ...newPlayer,
                            playerNumber: e.target.value
                        })} placeholder='24' style={{ width: '50px', textAlign: 'center' }} />
                        <input className="mx-1" type="text" onChange={e => setNewPlayer({
                            ...newPlayer,
                            playerName: e.target.value
                        })} placeholder='Kevin Durant' style={{ width: '200px', textAlign: 'center' }} />
                        <Button onClick={handleAddPlayer} size="sm" variant="secondary">Add</Button>
                    </>
                    : null}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setNewPlayer({
                    ...newPlayer,
                    status: true
                })} variant="primary">
                    Add Player
                </Button>
                <Button variant="secondary" onClick={() => handleClose(2)}>
                    Close
                </Button>
            </Modal.Footer>
        </>
    )
}

export default Modal_2;