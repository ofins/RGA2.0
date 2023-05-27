import {
    Modal,
    Button,
    Form
} from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/index'

function Modal_1() {
    const dispatch = useDispatch();

    //getting selectedTeam info from Redux state
    const selectedTeam = useSelector(state => state.selectedTeamReducer)

    //temporary create new player name saved here
    const [NewPlayer, setNewPlayer] = useState({
        teamName:selectedTeam,
        playerNumber: null,
        playerName: ''
    });
    
    //when submitted, player name will be saved to redux state
    const handleSubmit = () => {
        dispatch(actions.addPlayer(NewPlayer))
        handleClose(1)
    }

    const handleClose = (num) => {
        dispatch(actions.closeModal(num))
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Create New Player</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Player Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Insert Player Number"
                            autoFocus
                            onChange={e => setNewPlayer({
                                ...NewPlayer,
                                playerNumber: e.target.value
                            }
                            )}
                        />
                        <Form.Label>Player Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Insert Player Name"
                            autoFocus
                            onChange={e => setNewPlayer({
                                ...NewPlayer,
                                playerName: e.target.value
                            }
                            )}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose(1)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </>
    )
}

export default Modal_1