let id = 2;

const teamReducer = (
  state = [
    {
      id: 1,
      name: "LA Lakers",
      players: [
        { name: "Kobe Bryant", number: 24 },
        { name: "Lebron James", number: 6 },
        { name: "Paul Gasol", number: 16 },
        { name: "Lamar Odom", number: 17 },
        { name: "Shaquille O'Neal", number: 34 },
        { name: "Magic Johnson", number: 32 },
        { name: "Kareem Abdul-Jabbar", number: 33 },
      ],
    },
    {
      id: 2,
      name: "GS Warriors",
      players: [
        { name: "Stephen Curry", number: 30 },
        { name: "Draymond Green", number: 23 },
        { name: "Klay Thompson", number: 11 },
        { name: "Kevin Looney", number: 5 },
        { name: "Anthony Lamb", number: 40 },
        { name: "Lester Quinones", number: 25 },
        { name: "Andrew Wiggins", number: 22 },
      ],
    },
  ],
  action
) => {
  switch (action.type) {
    case "ADD_TEAM":
      id = id + 1;
      return [
        ...state,
        {
          id: id,
          name: action.payload.teamName,
          players: [],
        },
      ];
    case "ADD_PLAYER":
      return state.map((team) => {
        if (team.name === action.payload.teamName) {
          team.players.push({
            name: action.payload.playerName,
            number: action.payload.playerNumber,
          });
        }
        return team;
      });
    case "EDIT_PLAYER":
      return state.map((team) => {
        if (team.name === action.payload.teamName) {
          const pIndex = team.players.findIndex(
            (player) => player.name === action.payload.playerName
          );
          team.players[pIndex].name = action.payload.updatedPlayerName;
          team.players[pIndex].number = action.payload.updatedPlayerNumber;
        }
        return team;
      });
      return state;
    case "DELETE_PLAYER":
      return state.map((team) => {
        if (team.name === action.payload.teamName) {
          const pIndex = team.players.findIndex(
            (player) => player.name === action.payload.playerName
          );
          team.players.splice(pIndex, 1);
        }
        return team;
      });
    default:
      return state;
  }
};

export default teamReducer;
