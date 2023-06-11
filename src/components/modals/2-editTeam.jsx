import { Modal, Button, Form, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import axios from 'axios'

function Modal_2({ handleClose }) {
  const dispatch = useDispatch();

  //this is made only to give useEffect something to trigger
  const [deleteStat, setDeleteStat] = useState(false)
  
  //fetch data for all teams
  const fetchAllTeams = async () => {
    try {
      const res = await axios.get("https://rga-backend-jdbm.onrender.com/teams")
      dispatch(actions.importTeams(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  // DISPLAYING PLAYER LIST **
  //get players info from Redux state
  const teams = useSelector((state) => state.teamReducer);
  

  //check which team is currently selected
  const selectedTeam = useSelector((state) => state.selectedTeamReducer);

  //EDITING PLAYER INFO**
  //create state to hold updated info for editing player name/number
  const [updatePlayer, setUpdatePlayer] = useState({
    status: false,
    playerId: null,
    teamName: selectedTeam,
    newPlayerName: "",
    newPlayerNumber: "",
  });



  //update button
  const handleUpdate = () => {
    dispatch(
      actions.editPlayerName(
        selectedTeam,
        updatePlayer.playerId,
        updatePlayer.newPlayerName,
        updatePlayer.newPlayerNumber
      )
    );
    setUpdatePlayer({
      status: false,
      playerId: null,
      playerNumber: "",
      teamName: selectedTeam,
      newPlayerNumber: "",
      newPlayerName: "",
    });
  };

  //filter the players from selectedTeam
  let players = [];
  {
    teams.length > 0?
      players = teams.find((item) => {
        return item._id === selectedTeam;
      }).players
      : null
  }

  //create a list of players based on selected team and input it into table
  const playerList = players.map((player, index) => (
    <tr key={index} className="text-center">
      <td>
        {updatePlayer.playerId === player._id ? (
          <input
            type="text"
            onChange={(e) =>
              setUpdatePlayer({
                ...updatePlayer,
                newPlayerNumber: e.target.value,
              })
            }
            placeholder={updatePlayer.playerNumber}
            style={{ width: "30px" }}
          />
        ) : (
          player.number
        )}
      </td>
      <td>
        {updatePlayer.playerId === player._id ? (
          <input
            type="text"
            onChange={(e) =>
              setUpdatePlayer({
                ...updatePlayer,
                newPlayerName: e.target.value,
              })
            }
            placeholder={updatePlayer.playerName}
            style={{ width: "120px" }}
          />
        ) : (
          player.name
        )}
      </td>
      <td>
        {updatePlayer.playerId === player._id ? (
          <Button variant="light" onClick={handleUpdate}>
            Update
          </Button>
        ) : (
          <Button
            onClick={() => {
              handleEdit(player._id)
            }}
            variant="light"
          >
            Edit
          </Button>
        )}
      </td>
      <td>
        <Button
          onClick={() => {
            dispatch(actions.deletePlayerName(selectedTeam, player._id))
            setDeleteStat(prev => !prev)
          }
          }
          variant="light"
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  //when edit button is clicked, edit input box will appear and store which names to be edited in updatePlayer state
  const handleEdit = (playerId) => {
    setUpdatePlayer({
      ...updatePlayer,
      status: true,
      playerId,
      // playerNumber: number,
    });
  };

  //ADD NEW PLAYER **

  //temporary create new player name saved here
  const [newPlayer, setNewPlayer] = useState({
    status: false,
    teamId: selectedTeam,
    playerNumber: null,
    playerName: "",
  });

  useEffect(()=>{
    fetchAllTeams();
  }, [updatePlayer, newPlayer, deleteStat])

  const handleAddPlayer = () => {
    dispatch(actions.addPlayer(newPlayer));
    setNewPlayer({
      status: false,
      teamId: selectedTeam,
      playerNumber: null,
      playerName: "",
    });

  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit Team</Modal.Title>
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
          <tbody>{playerList}</tbody>
        </Table>
        {newPlayer.status ? (
          <>
            <input
              className="mx-1"
              type="text"
              autoFocus
              onChange={(e) =>
                setNewPlayer({
                  ...newPlayer,
                  playerNumber: e.target.value,
                })
              }
              placeholder="24"
              style={{ width: "50px", textAlign: "center" }}
            />
            <input
              className="mx-1"
              type="text"
              onChange={(e) =>
                setNewPlayer({
                  ...newPlayer,
                  playerName: e.target.value,
                })
              }
              placeholder="Kevin Durant"
              style={{ width: "200px", textAlign: "center" }}
            />
            <Button onClick={handleAddPlayer} size="sm" variant="secondary">
              Add
            </Button>
          </>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setNewPlayer({
              ...newPlayer,
              status: true,
            })

          }
          }
          variant="primary"
        >
          Add Player
        </Button>
        <Button variant="secondary" onClick={() => handleClose(2)}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
}

export default Modal_2;
