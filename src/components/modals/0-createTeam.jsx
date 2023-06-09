import {
    Modal,
    Button,
    Form
} from 'react-bootstrap'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/index'

function Modal_0() {
    const dispatch = useDispatch();

    //temporary create new team name saved here
    const [NewTeamName, setNewTeamName] = useState('');
    //when submitted, team name will be saved to redux state
    const handleSubmit = () => {
        dispatch(actions.addTeam(NewTeamName))
        handleClose(0)
    }

    const handleClose = (num) => {
        dispatch(actions.closeModal(num))
    };


    return(
        <>
        <Modal.Header closeButton>
            <Modal.Title>Create New Team</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Team Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insert Team Name"
                    autoFocus
                    onChange={e => setNewTeamName(e.target.value
                    )}
                />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(0)}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            </Modal.Footer>
        </>
    )
}

export default Modal_0