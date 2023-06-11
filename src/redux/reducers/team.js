import axios from 'axios'
let id = 2;

const teamReducer = (
  state = [],
  action
) => {
  switch (action.type) {
    case "IMPORT_TEAMS":
      return state = action.payload.obj
    case "ADD_TEAM":
      return add();
      async function add() {
        try {
          const res = await axios.post("https://rga-backend-jdbm.onrender.com/teams", {teamName: action.payload.teamName})
        } catch (error) {
          console.log(error)
        }
      }
    case "ADD_PLAYER":
      return addPlayer(action.payload.teamId, action.payload.playerName, action.payload.playerNumber)
    async function addPlayer(teamId, playerName, playerNumber) {
      try {
        const res = axios.post("https://rga-backend-jdbm.onrender.com/teams/"+teamId, {teamId, name: playerName, number: playerNumber})
      } catch (error) {
        console.log(error)
      }
    }  
    case "EDIT_PLAYER":
      return editPlayer(action.payload.playerId, action.payload.updatedPlayerName, action.payload.updatedPlayerNumber);
      async function editPlayer(id, playerName, playerNumber) {
        try {
          const res = axios.put("https://rga-backend-jdbm.onrender.com/teams/"+id,  {name: playerName, number: playerNumber})
        } catch (error) {
          console.log(error)
        }
      }
    case "DELETE_PLAYER":
      return deletePlayer(action.payload.team, action.payload.playerId);
      async function deletePlayer(team, playerId) {
        try {
          const res = axios.delete("https://rga-backend-jdbm.onrender.com/teams/"+playerId)
        } catch (error) {
          console.log(error)
        }
      }
    default:
      return state;
  }
};

export default teamReducer;


